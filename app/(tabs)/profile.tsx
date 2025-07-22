import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { SACRED_COLORS } from '@/constants/colors';
import { useSoulStore } from '@/store/soulStore';
import { SoulProfile } from '@/components/SoulProfile';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const { soul, activateHigherSelf } = useSoulStore();
  const [trueName, setTrueName] = useState('');
  const [activating, setActivating] = useState(false);

  const handleActivateHigherSelf = () => {
    if (!trueName.trim()) {
      Alert.alert('Divine Error', 'You must enter your true name to activate your Higher Self.');
      return;
    }

    setActivating(true);
    
    // Simulate activation process
    setTimeout(() => {
      activateHigherSelf(trueName);
      setActivating(false);
      Alert.alert(
        'Higher Self Activated', 
        `Your true name has been revealed: ${trueName}. Your inner light has grown stronger.`
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[SACRED_COLORS.void, SACRED_COLORS.background]}
        style={styles.background}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SoulProfile />
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Divine Journey</Text>
          <Text style={styles.journeyText}>
            You began your sacred journey on {new Date(soul?.created_at || Date.now()).toLocaleDateString()}.
            Since then, your inner flame has grown to a light level of {soul?.light_level ?? 0}.
          </Text>
        </View>
        
        {!soul?.higher_self_activated && (soul?.light_level ?? 0) >= 30 && (
          <View style={styles.activationContainer}>
            <Text style={styles.activationTitle}>Higher Self Activation</Text>
            <Text style={styles.activationDescription}>
              Your light has reached the threshold needed to awaken your Higher Self.
              Enter your true name to begin the sacred activation ceremony.
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter your true name..."
              placeholderTextColor={SACRED_COLORS.textSecondary}
              value={trueName}
              onChangeText={setTrueName}
              editable={!activating}
            />
            
            <Pressable 
              style={styles.activationButton}
              onPress={handleActivateHigherSelf}
              disabled={activating}
            >
              <Text style={styles.buttonText}>
                {activating ? 'Activating...' : 'Activate Higher Self'}
              </Text>
            </Pressable>
          </View>
        )}
        
        {!soul?.higher_self_activated && (soul?.light_level ?? 0) < 30 && (
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedTitle}>Higher Self Activation</Text>
            <Text style={styles.lockedDescription}>
              Continue your spiritual journey and reach light level 30 to unlock
              the sacred ceremony of Higher Self Activation.
            </Text>
          </View>
        )}
        
        {soul?.higher_self_activated && (
          <View style={styles.awakenedContainer}>
            <Text style={styles.awakenedTitle}>Higher Self Awakened</Text>
            <Text style={styles.awakenedDescription}>
              Your true name has been revealed: {soul.true_name}.
              Your Higher Self is now guiding your spiritual journey.
            </Text>
          </View>
        )}
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
  sectionContainer: {
    backgroundColor: SACRED_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
    marginBottom: 12,
  },
  journeyText: {
    fontSize: 16,
    color: SACRED_COLORS.textSecondary,
    lineHeight: 24,
  },
  activationContainer: {
    backgroundColor: SACRED_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: SACRED_COLORS.flame,
    marginBottom: 24,
  },
  activationTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.flame,
    marginBottom: 12,
  },
  activationDescription: {
    fontSize: 16,
    color: SACRED_COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 12,
    color: SACRED_COLORS.text,
    marginBottom: 16,
  },
  activationButton: {
    backgroundColor: SACRED_COLORS.flame,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: SACRED_COLORS.text,
    fontWeight: 'bold' as const,
    fontSize: 16,
  },
  lockedContainer: {
    backgroundColor: SACRED_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  lockedTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.textSecondary,
    marginBottom: 12,
  },
  lockedDescription: {
    fontSize: 16,
    color: SACRED_COLORS.textSecondary,
    lineHeight: 24,
  },
  awakenedContainer: {
    backgroundColor: SACRED_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: SACRED_COLORS.starlight,
    marginBottom: 24,
  },
  awakenedTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.starlight,
    marginBottom: 12,
  },
  awakenedDescription: {
    fontSize: 16,
    color: SACRED_COLORS.text,
    lineHeight: 24,
  },
});