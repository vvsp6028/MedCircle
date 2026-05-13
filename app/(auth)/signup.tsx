import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Check, ChevronDown, Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { COLLEGES } from '../../constants/sampleData';
import { BATCH_LABELS, BatchYear } from '../../types';
import { haptic } from '../../lib/haptics';
import { signUp } from '../../lib/auth';

const BATCH_KEYS: BatchYear[] = [
  '1st_year', '2nd_year', '3rd_year', '4th_year', 'final_year', 'intern', 'graduated',
];

export default function Signup() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [college, setCollege] = useState<string | null>(null);
  const [batch, setBatch] = useState<BatchYear | null>(null);
  const [collegeOpen, setCollegeOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit =
    !loading &&
    name.trim().length > 1 &&
    email.includes('@') &&
    password.length >= 6 &&
    college !== null &&
    batch !== null;

  const submit = async () => {
    if (!canSubmit) return;
    setErrorMsg(null);
    setLoading(true);
    haptic.light();

    const { data, error } = await signUp({
      email: email.trim().toLowerCase(),
      password,
      fullName: name.trim(),
      collegeName: college!,
      batchYear: batch!,
    });

    setLoading(false);

    if (error) {
      haptic.warning();
      setErrorMsg(error.message);
      return;
    }

    if (data?.user) {
      haptic.success();
      // Email confirmation is OFF in Supabase, so session is immediate
      router.replace('/(tabs)/home');
    } else {
      // Edge case: signup succeeded but no session (e.g. confirmation required)
      Alert.alert(
        'Check your email',
        'We sent you a confirmation link. Please verify your email and log in.',
      );
      router.replace('/(auth)/login');
    }
  };

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.topBar}>
        <Pressable onPress={goBack} hitSlop={8} style={styles.iconBtn}>
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            Create account
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Join your college community
          </Text>

          <View style={{ gap: 16, marginTop: 24 }}>
            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Venkata Prasad"
              autoCapitalize="words"
              editable={!loading}
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="At least 6 characters"
              secureTextEntry={!showPw}
              editable={!loading}
              iconRight={
                <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={8}>
                  {showPw ? (
                    <EyeOff size={18} color={theme.colors.textTertiary} />
                  ) : (
                    <Eye size={18} color={theme.colors.textTertiary} />
                  )}
                </Pressable>
              }
            />
            <PickerField
              label="College"
              value={college ?? 'Select your college'}
              placeholder={!college}
              onPress={() => !loading && setCollegeOpen(true)}
            />
            <PickerField
              label="Batch Year"
              value={batch ? BATCH_LABELS[batch] : 'Select your year'}
              placeholder={!batch}
              onPress={() => !loading && setBatchOpen(true)}
            />
          </View>

          {errorMsg && (
            <View style={[styles.errorBox, { backgroundColor: theme.colors.errorSoft }]}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errorMsg}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 28 }}>
            <Button size="lg" fullWidth onPress={submit} disabled={!canSubmit} loading={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </View>

          <Pressable
            onPress={() => router.replace('/(auth)/login')}
            style={{ marginTop: 16, alignSelf: 'center' }}
            disabled={loading}
          >
            <Text style={[styles.bottomLink, { color: theme.colors.textSecondary }]}>
              Already have an account?{' '}
              <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>Sign in</Text>
            </Text>
          </Pressable>

          <Text style={[styles.terms, { color: theme.colors.textTertiary }]}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <PickerModal
        open={collegeOpen}
        title="Select your college"
        onClose={() => setCollegeOpen(false)}
        items={COLLEGES.map((c) => ({ key: c, label: c }))}
        selected={college}
        onSelect={(k) => { setCollege(k); setCollegeOpen(false); }}
      />
      <PickerModal
        open={batchOpen}
        title="Select your batch year"
        onClose={() => setBatchOpen(false)}
        items={BATCH_KEYS.map((b) => ({ key: b, label: BATCH_LABELS[b] }))}
        selected={batch}
        onSelect={(k) => { setBatch(k as BatchYear); setBatchOpen(false); }}
      />
    </SafeAreaView>
  );
}

interface PickerFieldProps {
  label: string;
  value: string;
  placeholder: boolean;
  onPress: () => void;
}

const PickerField: React.FC<PickerFieldProps> = ({ label, value, placeholder, onPress }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={[styles.pickerLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
      <Pressable
        onPress={onPress}
        style={[
          styles.pickerField,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.pickerValue,
            { color: placeholder ? theme.colors.textTertiary : theme.colors.textPrimary },
          ]}
        >
          {value}
        </Text>
        <ChevronDown size={18} color={theme.colors.textTertiary} />
      </Pressable>
    </View>
  );
};

interface PickerModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  items: Array<{ key: string; label: string }>;
  selected: string | null;
  onSelect: (key: string) => void;
}

const PickerModal: React.FC<PickerModalProps> = ({
  open, title, onClose, items, selected, onSelect,
}) => {
  const { theme } = useTheme();
  return (
    <Modal visible={open} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: theme.colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24 }]}>
        <View style={styles.grabber}>
          <View style={[styles.grabberBar, { backgroundColor: theme.colors.border }]} />
        </View>
        <Text style={[styles.sheetTitle, { color: theme.colors.textPrimary }]}>{title}</Text>
        <FlatList
          data={items}
          keyExtractor={(it) => it.key}
          renderItem={({ item }) => {
            const isSelected = selected === item.key;
            return (
              <Pressable
                onPress={() => onSelect(item.key)}
                style={[styles.sheetItem, { borderBottomColor: theme.colors.borderSoft }]}
              >
                <Text
                  style={[
                    styles.sheetItemText,
                    { color: theme.colors.textPrimary, fontWeight: isSelected ? '700' : '500' },
                  ]}
                >
                  {item.label}
                </Text>
                {isSelected && <Check size={18} color={theme.colors.primary} />}
              </Pressable>
            );
          }}
          style={{ maxHeight: 420 }}
        />
        <View style={{ height: 12 }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 12, paddingTop: 8 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: 24, paddingTop: 16 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 4 },
  pickerLabel: { fontSize: 13, fontWeight: '500', marginBottom: 6 },
  pickerField: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1.5, paddingHorizontal: 14, minHeight: 50,
  },
  pickerValue: { flex: 1, fontSize: 15 },
  errorBox: { padding: 12, borderRadius: 12, marginTop: 16 },
  errorText: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
  bottomLink: { fontSize: 14 },
  terms: { fontSize: 12, marginTop: 24, textAlign: 'center', lineHeight: 16 },
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16 },
  grabber: { alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  grabberBar: { width: 40, height: 4, borderRadius: 2 },
  sheetTitle: { fontSize: 18, fontWeight: '700', paddingVertical: 12, paddingHorizontal: 4 },
  sheetItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, paddingHorizontal: 4, borderBottomWidth: 1,
  },
  sheetItemText: { fontSize: 15 },
});
