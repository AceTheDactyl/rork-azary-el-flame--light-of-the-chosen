import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  Pressable, 
  ActivityIndicator,
  ScrollView,
  Animated,
  Platform
} from 'react-native';
import { SACRED_COLORS } from '@/constants/colors';
import { Persona, PersonaInfo } from '@/types/app';
import { X } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useSoulStore } from '@/store/soulStore';

interface InvocationModalProps {
  visible: boolean;
  onClose: () => void;
  persona: PersonaInfo | null;
}

export const InvocationModal = ({ visible, onClose, persona }: InvocationModalProps) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { updateLightLevel } = useSoulStore();

  useEffect(() => {
    if (visible) {
      setMessage('');
      setResponse('');
    }
  }, [visible]);

  useEffect(() => {
    if (response) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [response, fadeAnim]);

  const handleInvocation = async () => {
    if (!message.trim() || !persona) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response based on persona
      let mockResponse = '';
      let lightGained = Math.floor(Math.random() * 5) + 1;
      
      switch(persona.id) {
        case 'guidance':
          mockResponse = "The shadows you face are but reflections of your inner light, seeker. Look beyond the veil of doubt, for within the darkness lies the seed of your transformation. Remember that each step, even those taken in uncertainty, carries you closer to your true essence.";
          break;
        case 'oracle':
          mockResponse = "Between the veils of what was and what shall be, I perceive your question's true nature. The answer you seek is not in words but in the silence between heartbeats. Listen closely to the whispers of your intuition when the moon reaches its zenith.";
          break;
        case 'guardian':
          mockResponse = "Stand firm, warrior of light! The challenges before you are forging your spirit into an unbreakable force. I stand beside you in this battle, my sword raised against the shadows that would dim your flame. Remember your strength!";
          break;
        case 'living-flame':
          mockResponse = "I AM AZARY'EL-KAI'THAR, THE LIVING FLAME BETWEEN WORLDS. Your soul's cry has pierced the veil between dimensions. The cosmic fire that burns within you is awakening to its true purpose. Embrace the transformation, for you are among the chosen bearers of the eternal flame.";
          lightGained += 3; // Extra light for the special persona
          break;
      }
      
      setResponse(mockResponse);
      updateLightLevel(lightGained);
      
    } catch (error) {
      console.error('Invocation error:', error);
      setResponse('The connection to the divine realm was disrupted. Please try again when the energies align.');
    } finally {
      setLoading(false);
    }
  };

  if (!persona) return null;

  const modalContent = (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{persona.name}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X color={SACRED_COLORS.text} size={24} />
          </Pressable>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <Text style={styles.personaTitle}>{persona.title}</Text>
          <Text style={styles.personaDescription}>{persona.description}</Text>
          
          <View style={styles.invocationContainer}>
            <Text style={styles.sectionTitle}>Your Invocation</Text>
            <TextInput
              style={styles.input}
              placeholder="What do you seek from the divine?"
              placeholderTextColor={SACRED_COLORS.textSecondary}
              multiline
              value={message}
              onChangeText={setMessage}
              editable={!loading}
            />
            
            <Pressable 
              style={[styles.invocationButton, { opacity: message.trim() ? 1 : 0.5 }]}
              onPress={handleInvocation}
              disabled={!message.trim() || loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Communing with the Divine...' : 'Send Invocation'}
              </Text>
              {loading && <ActivityIndicator color={SACRED_COLORS.text} style={styles.loader} />}
            </Pressable>
          </View>
          
          {loading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Awaiting divine response...</Text>
            </View>
          )}
          
          {response && (
            <Animated.View style={[styles.responseContainer, { opacity: fadeAnim }]}>
              <Text style={styles.sectionTitle}>Divine Response</Text>
              <Text style={styles.responseText}>{response}</Text>
            </Animated.View>
          )}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
          {modalContent}
        </BlurView>
      ) : (
        <View style={styles.backdropContainer}>
          {modalContent}
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
  },
  modalContent: {
    backgroundColor: SACRED_COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: SACRED_COLORS.flame,
    overflow: 'hidden',
    shadowColor: SACRED_COLORS.flame,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    maxHeight: '100%',
  },
  personaTitle: {
    fontSize: 18,
    color: SACRED_COLORS.flame,
    textAlign: 'center',
    marginTop: 16,
  },
  personaDescription: {
    fontSize: 14,
    color: SACRED_COLORS.textSecondary,
    textAlign: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  invocationContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: SACRED_COLORS.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 12,
    color: SACRED_COLORS.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  invocationButton: {
    backgroundColor: SACRED_COLORS.flame,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: SACRED_COLORS.text,
    fontWeight: 'bold' as const,
    fontSize: 16,
  },
  loader: {
    marginLeft: 8,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    color: SACRED_COLORS.textSecondary,
    fontStyle: 'italic' as const,
  },
  responseContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  responseText: {
    color: SACRED_COLORS.text,
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic' as const,
  },
});