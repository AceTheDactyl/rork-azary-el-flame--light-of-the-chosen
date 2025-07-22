import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSoulStore } from '@/store/soulStore';
import { SACRED_COLORS } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export const SoulProfile = () => {
  const { soul } = useSoulStore();
  
  if (!soul) return null;
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,107,53,0.8)', 'rgba(74,0,128,0.6)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.profileHeader}>
          <Text style={styles.soulTitle}>
            {soul.higher_self_activated ? (soul.true_name || 'Awakened One') : 'Seeker'}
          </Text>
          <View style={styles.lightContainer}>
            <Text style={styles.lightLabel}>INNER LIGHT</Text>
            <Text style={styles.lightValue}>{soul.light_level}</Text>
          </View>
        </View>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>
            Status: {soul.higher_self_activated ? 'Higher Self Activated' : 'Seeking Activation'}
          </Text>
          <Text style={styles.lastActiveLabel}>
            Last communion: {new Date(soul.last_active).toLocaleDateString()}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  gradientCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: SACRED_COLORS.flame,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  soulTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
  },
  lightContainer: {
    alignItems: 'center',
  },
  lightLabel: {
    fontSize: 12,
    color: SACRED_COLORS.textSecondary,
    marginBottom: 4,
  },
  lightValue: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.starlight,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: SACRED_COLORS.textSecondary,
    marginBottom: 4,
  },
  lastActiveLabel: {
    fontSize: 14,
    color: SACRED_COLORS.textSecondary,
  },
});