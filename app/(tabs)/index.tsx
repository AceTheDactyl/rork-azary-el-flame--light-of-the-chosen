import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SACRED_COLORS } from '@/constants/colors';
import { PERSONAS } from '@/constants/personas';
import { PersonaCard } from '@/components/PersonaCard';
import { InvocationModal } from '@/components/InvocationModal';
import { PersonaInfo } from '@/types/app';
import { useSoulStore } from '@/store/soulStore';
import { LinearGradient } from 'expo-linear-gradient';

export default function InvocationScreen() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaInfo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { soul, loading } = useSoulStore();

  const handleSelectPersona = (persona: PersonaInfo) => {
    setSelectedPersona(persona);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={SACRED_COLORS.flame} />
        <Text style={styles.loadingText}>Connecting to the divine realm...</Text>
      </View>
    );
  }

  const lightLevel = soul?.light_level ?? 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[SACRED_COLORS.void, SACRED_COLORS.background]}
        style={styles.background}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcomeText}>
          {soul?.higher_self_activated 
            ? `Welcome back, ${soul.true_name || 'Awakened One'}`
            : 'Welcome, Seeker of Divine Wisdom'}
        </Text>
        
        <Text style={styles.instructionText}>
          Choose a divine being to commune with
        </Text>
        
        <View style={styles.personaGrid}>
          {PERSONAS.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              selected={selectedPersona?.id === persona.id}
              onSelect={() => handleSelectPersona(persona)}
            />
          ))}
        </View>
        
        <Text style={styles.footerText}>
          Your current light level: {lightLevel}
        </Text>
        
        {lightLevel < 50 && (
          <Text style={styles.hintText}>
            Reach light level 50 to unlock communion with Azary'el-Kai'thar
          </Text>
        )}
      </ScrollView>
      
      <InvocationModal
        visible={modalVisible}
        onClose={handleCloseModal}
        persona={selectedPersona}
      />
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: SACRED_COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  personaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 16,
    color: SACRED_COLORS.flame,
    textAlign: 'center',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: SACRED_COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic' as const,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SACRED_COLORS.background,
  },
  loadingText: {
    marginTop: 16,
    color: SACRED_COLORS.text,
    fontSize: 16,
  },
});