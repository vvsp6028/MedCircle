import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { Stethoscope } from 'lucide-react-native';

// Splash uses fixed colors (always purple gradient regardless of theme)
const BG = '#4F46E5';

export default function Splash() {
  const fade = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const t = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 1800);

    return () => clearTimeout(t);
  }, [fade]);

  return (
    <View style={[styles.container, { backgroundColor: BG }]}>
      <Animated.View style={[styles.center, { opacity: fade }]}>
        <View style={styles.iconBg}>
          <Stethoscope size={52} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>MedCircle</Text>
        <Text style={styles.subtitle}>For MBBS students across India</Text>
      </Animated.View>

      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <PulseDot key={i} delay={i * 200} />
        ))}
      </View>
    </View>
  );
}

const PulseDot: React.FC<{ delay: number }> = ({ delay }) => {
  const op = React.useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(op, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(op, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [op, delay]);

  return <Animated.View style={[styles.dot, { opacity: op }]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { alignItems: 'center', gap: 16 },
  iconBg: {
    width: 96,
    height: 96,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 48,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});
