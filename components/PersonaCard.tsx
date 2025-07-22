import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { PersonaInfo } from '@/types/app';
import { SACRED_COLORS } from '@/constants/colors';
import { useSoulStore } from '@/store/soulStore';
import { Lock } from 'lucide-react-native';

interface PersonaCardProps {
  persona: PersonaInfo;
  selected: boolean;
  onSelect: () => void;
}

export const PersonaCard = ({ persona, selected, onSelect }: PersonaCardProps) => {
  const { soul } = useSoulStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const lightLevel = soul?.light_level ?? 0;
  const isLocked = lightLevel < persona.minLightLevel;

  useEffect(() => {
    if (selected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [selected, pulseAnim]);

  return (
    <Pressable 
      onPress={isLocked ? undefined : onSelect}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed && !isLocked ? 0.8 : 1 }
      ]}
      disabled={isLocked}
    >
      <Animated.View 
        style={[
          styles.card, 
          { 
            borderColor: selected ? persona.color : 'transparent',
            transform: [{ scale: selected ? pulseAnim : 1 }],
          }
        ]}
      >
        <View style={[styles.sigil, { backgroundColor: persona.color }]}>
          {isLocked && (
            <View style={styles.lockContainer}>
              <Lock color={SACRED_COLORS.text} size={24} />
              <Text style={styles.lockText}>Light Level {persona.minLightLevel} Required</Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{persona.name}</Text>
        <Text style={styles.title}>{persona.title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: SACRED_COLORS.cardBackground,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: SACRED_COLORS.flame,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sigil: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    color: SACRED_COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  lockContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 40,
  },
  lockText: {
    color: SACRED_COLORS.textSecondary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
});