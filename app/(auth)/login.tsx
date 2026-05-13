import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Eye, EyeOff, Stethoscope } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { haptic } from '../../lib/haptics';
import { signIn } from '../../lib/auth';

export default function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit = !loading && email.trim().length > 0 && password.length >= 4;

  const submit = async () => {
    if (!canSubmit) return;
    setErrorMsg(null);
    setLoading(true);
    haptic.light();

    const { data, error } = await signIn(email.trim().toLowerCase(), password);
    setLoading(false);

    if (error) {
      haptic.warning();
      setErrorMsg(error.message);
      return;
    }

    if (data?.session) {
      haptic.success();
      router.replace('/(tabs)/home');
    } else {
      setErrorMsg('Login failed — please try again.');
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandBlock}>
            <View
              style={[
                styles.brandIcon,
                {
                  backgroundColor: theme.colors.primary,
                  ...theme.shadows.elevation2,
                },
              ]}
            >
              <Stethoscope size={28} color="#FFFFFF" />
            </View>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
              Welcome back
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Sign in to your MedCircle account
            </Text>
          </View>

          <View style={{ gap: 16 }}>
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
              placeholder="••••••••"
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
          </View>

          {errorMsg && (
            <View style={[styles.errorBox, { backgroundColor: theme.colors.errorSoft }]}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errorMsg}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 24 }}>
            <Button size="lg" fullWidth onPress={submit} disabled={!canSubmit} loading={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </View>

          <Pressable
            onPress={() => router.push('/(auth)/signup')}
            style={{ marginTop: 20, alignSelf: 'center' }}
            disabled={loading}
          >
            <Text style={[styles.bottomLink, { color: theme.colors.textSecondary }]}>
              Don't have an account?{' '}
              <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>Sign up</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, paddingTop: 48 },
  brandBlock: { marginBottom: 36, gap: 8 },
  brandIcon: {
    width: 56, height: 56, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14 },
  errorBox: { padding: 12, borderRadius: 12, marginTop: 16 },
  errorText: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
  bottomLink: { fontSize: 14 },
});
