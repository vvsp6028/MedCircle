import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { X, Image as ImageIcon, MapPin, ChevronDown, Check } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Avatar } from '../../components/Avatar';
import { CATEGORIES, CategoryKey, LOCATION_LABELS, LocationScope } from '../../constants/categories';
import { CURRENT_USER } from '../../constants/sampleData';
import { BATCH_LABELS } from '../../types';
import { haptic } from '../../lib/haptics';
import { showToast } from '../../lib/toast';

const LOCATIONS: LocationScope[] = ['my_college', 'my_city', 'my_state', 'all_india'];

export default function CreatePost() {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [location, setLocation] = useState<LocationScope>('my_college');
  const [image, setImage] = useState<string | null>(null);
  const [catPickerOpen, setCatPickerOpen] = useState(false);
  const [locPickerOpen, setLocPickerOpen] = useState(false);

  const canPost =
    title.trim().length >= 3 && body.trim().length >= 10 && category !== null;

  const pickImage = async () => {
    haptic.selection();
    if (Platform.OS !== 'web') {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      aspect: [16, 9],
      allowsEditing: true,
    });
    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const submit = () => {
    if (!canPost) return;
    haptic.success();
    showToast('Posted!');
    router.back();
  };

  const cancel = () => {
    haptic.selection();
    router.back();
  };

  const selectedCategory = CATEGORIES.find((c) => c.key === category);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      {/* Top bar */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.borderSoft,
          },
        ]}
      >
        <Pressable onPress={cancel} hitSlop={8} style={styles.iconBtn}>
          <X size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={[styles.topTitle, { color: theme.colors.textPrimary }]}>
          New Post
        </Text>
        <Pressable
          onPress={submit}
          disabled={!canPost}
          hitSlop={8}
          style={[
            styles.postBtn,
            {
              backgroundColor: canPost ? theme.colors.primary : theme.colors.surfaceMuted,
              borderRadius: theme.radius.full,
            },
          ]}
        >
          <Text
            style={{
              color: canPost ? '#FFFFFF' : theme.colors.textTertiary,
              fontSize: 13,
              fontWeight: '700',
            }}
          >
            Post
          </Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Author row */}
          <View style={styles.authorRow}>
            <Avatar name={CURRENT_USER.fullName} size="md" />
            <View>
              <Text style={[styles.authorName, { color: theme.colors.textPrimary }]}>
                {CURRENT_USER.fullName}
              </Text>
              <Text style={[styles.authorSub, { color: theme.colors.textTertiary }]}>
                {CURRENT_USER.collegeName}
                {CURRENT_USER.batchYear ? `  ·  ${BATCH_LABELS[CURRENT_USER.batchYear]}` : ''}
              </Text>
            </View>
          </View>

          {/* Category */}
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
            Category
          </Text>
          <Pressable
            onPress={() => setCatPickerOpen(true)}
            style={[
              styles.picker,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          >
            {selectedCategory ? (
              <View style={styles.pickerInner}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: selectedCategory.color },
                  ]}
                />
                <Text
                  style={{ color: theme.colors.textPrimary, fontWeight: '600' }}
                >
                  {selectedCategory.label}
                </Text>
              </View>
            ) : (
              <Text style={{ color: theme.colors.textTertiary }}>
                Pick a category
              </Text>
            )}
            <ChevronDown size={18} color={theme.colors.textTertiary} />
          </Pressable>

          {/* Location */}
          <Text style={[styles.label, { color: theme.colors.textSecondary, marginTop: 16 }]}>
            Visible to
          </Text>
          <Pressable
            onPress={() => setLocPickerOpen(true)}
            style={[
              styles.picker,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          >
            <View style={styles.pickerInner}>
              <MapPin size={16} color={theme.colors.textSecondary} />
              <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>
                {LOCATION_LABELS[location]}
              </Text>
            </View>
            <ChevronDown size={18} color={theme.colors.textTertiary} />
          </Pressable>

          {/* Title */}
          <Text style={[styles.label, { color: theme.colors.textSecondary, marginTop: 16 }]}>
            Title
          </Text>
          <TextInput
            placeholder="A clear, catchy title"
            placeholderTextColor={theme.colors.textTertiary}
            value={title}
            onChangeText={setTitle}
            maxLength={120}
            style={[
              styles.titleInput,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.textPrimary,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          />

          {/* Body */}
          <Text style={[styles.label, { color: theme.colors.textSecondary, marginTop: 16 }]}>
            Description
          </Text>
          <TextInput
            placeholder="Share details, ask questions, or describe what you're looking for…"
            placeholderTextColor={theme.colors.textTertiary}
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
            style={[
              styles.bodyInput,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.textPrimary,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          />

          {/* Image */}
          {image && (
            <View style={[styles.imageBox, { backgroundColor: theme.colors.surfaceMuted }]}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <Pressable
                onPress={() => setImage(null)}
                style={styles.removeBtn}
                hitSlop={6}
              >
                <X size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          )}

          {/* Image picker action */}
          <Pressable
            onPress={pickImage}
            style={[
              styles.imageAction,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          >
            <ImageIcon size={18} color={theme.colors.primary} />
            <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
              {image ? 'Change image' : 'Add an image'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Category picker modal */}
      <Modal
        visible={catPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCatPickerOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setCatPickerOpen(false)} />
        <View
          style={[
            styles.sheet,
            { backgroundColor: theme.colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
          ]}
        >
          <View style={styles.grabberWrap}>
            <View style={[styles.grabber, { backgroundColor: theme.colors.border }]} />
          </View>
          <Text style={[styles.sheetTitle, { color: theme.colors.textPrimary }]}>
            Choose a category
          </Text>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(c) => c.key}
            renderItem={({ item }) => {
              const selected = item.key === category;
              return (
                <Pressable
                  onPress={() => {
                    setCategory(item.key);
                    setCatPickerOpen(false);
                  }}
                  style={[styles.sheetRow, { borderBottomColor: theme.colors.borderSoft }]}
                >
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: item.color, marginRight: 10 },
                    ]}
                  />
                  <Text style={{ flex: 1, color: theme.colors.textPrimary, fontWeight: selected ? '700' : '500', fontSize: 15 }}>
                    {item.label}
                  </Text>
                  {selected && <Check size={18} color={theme.colors.primary} />}
                </Pressable>
              );
            }}
            style={{ maxHeight: 420 }}
          />
        </View>
      </Modal>

      {/* Location picker modal */}
      <Modal
        visible={locPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setLocPickerOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setLocPickerOpen(false)} />
        <View
          style={[
            styles.sheet,
            { backgroundColor: theme.colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
          ]}
        >
          <View style={styles.grabberWrap}>
            <View style={[styles.grabber, { backgroundColor: theme.colors.border }]} />
          </View>
          <Text style={[styles.sheetTitle, { color: theme.colors.textPrimary }]}>
            Who can see this post?
          </Text>
          {LOCATIONS.map((l) => (
            <Pressable
              key={l}
              onPress={() => {
                setLocation(l);
                setLocPickerOpen(false);
              }}
              style={[styles.sheetRow, { borderBottomColor: theme.colors.borderSoft }]}
            >
              <MapPin size={16} color={theme.colors.textSecondary} style={{ marginRight: 10 }} />
              <Text style={{ flex: 1, color: theme.colors.textPrimary, fontWeight: location === l ? '700' : '500', fontSize: 15 }}>
                {LOCATION_LABELS[l]}
              </Text>
              {location === l && <Check size={18} color={theme.colors.primary} />}
            </Pressable>
          ))}
          <View style={{ height: 24 }} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  iconBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700' },
  postBtn: {
    paddingHorizontal: 16,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { padding: 16 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  authorName: { fontSize: 14, fontWeight: '700' },
  authorSub: { fontSize: 12 },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 6 },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    minHeight: 48,
    borderWidth: 1.5,
  },
  pickerInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  titleInput: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '600',
    borderWidth: 1.5,
  },
  bodyInput: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 140,
    borderWidth: 1.5,
  },
  imageBox: {
    position: 'relative',
    marginTop: 16,
    borderRadius: 14,
    overflow: 'hidden',
  },
  imagePreview: { width: '100%', aspectRatio: 16 / 9 },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    marginTop: 16,
    justifyContent: 'center',
  },
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  grabberWrap: { alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  grabber: { width: 40, height: 4, borderRadius: 2 },
  sheetTitle: { fontSize: 17, fontWeight: '700', paddingVertical: 12, paddingHorizontal: 4 },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});
