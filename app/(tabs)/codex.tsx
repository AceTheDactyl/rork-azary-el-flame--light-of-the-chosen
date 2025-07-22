import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SACRED_COLORS } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useSoulStore } from '@/store/soulStore';
import { BookOpen, Lock } from 'lucide-react-native';

// Mock codex entries
const codexEntries = [
  {
    id: '1',
    title: 'The Origin of the Flame',
    excerpt: 'Before time began, the Eternal Flame burned in the void...',
    minLightLevel: 0,
  },
  {
    id: '2',
    title: 'The Three Divine Guardians',
    excerpt: 'Azrael, Hecate, and Michael stand as pillars between realms...',
    minLightLevel: 0,
  },
  {
    id: '3',
    title: 'The Path of Awakening',
    excerpt: 'Seven steps lead to the awakening of the Higher Self...',
    minLightLevel: 20,
  },
  {
    id: '4',
    title: 'The Living Flame Prophecy',
    excerpt: 'When the chosen souls gather, the Living Flame shall speak...',
    minLightLevel: 40,
  },
  {
    id: '5',
    title: 'Sacred Geometry of the Soul',
    excerpt: 'The patterns that connect all beings across dimensions...',
    minLightLevel: 60,
  },
];

export default function CodexScreen() {
  const { soul } = useSoulStore();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[SACRED_COLORS.void, SACRED_COLORS.background]}
        style={styles.background}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <BookOpen color={SACRED_COLORS.flame} size={32} />
          <Text style={styles.headerTitle}>Sacred Codex</Text>
        </View>
        
        <Text style={styles.description}>
          Ancient wisdom revealed to those who seek. The sacred texts will unlock as your inner light grows stronger.
        </Text>
        
        {codexEntries.map((entry) => {
          const isLocked = (soul?.light_level || 0) < entry.minLightLevel;
          
          return (
            <Pressable 
              key={entry.id}
              style={[
                styles.entryCard,
                isLocked && styles.lockedEntry
              ]}
              disabled={isLocked}
            >
              <View style={styles.entryContent}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                
                {isLocked ? (
                  <View style={styles.lockedContent}>
                    <Lock color={SACRED_COLORS.textSecondary} size={20} />
                    <Text style={styles.lockedText}>
                      Requires Light Level {entry.minLightLevel}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.entryExcerpt}>{entry.excerpt}</Text>
                )}
              </View>
              
              {!isLocked && (
                <Text style={styles.readMoreText}>Read Full Text</Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
    marginLeft: 12,
  },
  description: {
    fontSize: 16,
    color: SACRED_COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  entryCard: {
    backgroundColor: SACRED_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: SACRED_COLORS.flame,
  },
  lockedEntry: {
    borderLeftColor: SACRED_COLORS.textSecondary,
    opacity: 0.7,
  },
  entryContent: {
    marginBottom: 12,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
    marginBottom: 8,
  },
  entryExcerpt: {
    fontSize: 16,
    color: SACRED_COLORS.textSecondary,
    lineHeight: 24,
  },
  readMoreText: {
    fontSize: 14,
    color: SACRED_COLORS.flame,
    textAlign: 'right',
  },
  lockedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  lockedText: {
    fontSize: 14,
    color: SACRED_COLORS.textSecondary,
    marginLeft: 8,
  },
});