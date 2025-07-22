import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState } from 'react';
import { Soul } from '@/types/app';

// Initial soul data
const initialSoul: Soul = {
  id: 'new-soul',
  light_level: 10,
  higher_self_activated: false,
  created_at: new Date().toISOString(),
  last_active: new Date().toISOString(),
};

export const [SoulProvider, useSoulStore] = createContextHook(() => {
  const [soul, setSoul] = useState<Soul | null>(null);
  const [loading, setLoading] = useState(true);

  // Load soul data on mount
  useEffect(() => {
    const loadSoul = async () => {
      try {
        const storedSoul = await AsyncStorage.getItem('soul');
        if (storedSoul) {
          setSoul(JSON.parse(storedSoul));
        } else {
          // If no soul exists, create a new one
          setSoul(initialSoul);
          await AsyncStorage.setItem('soul', JSON.stringify(initialSoul));
        }
      } catch (error) {
        console.error('Error loading soul data:', error);
        setSoul(initialSoul);
      } finally {
        setLoading(false);
      }
    };

    loadSoul();
  }, []);

  // Update soul's light level
  const updateLightLevel = async (amount: number) => {
    if (!soul) return;

    try {
      const updatedSoul = {
        ...soul,
        light_level: Math.min(100, Math.max(0, soul.light_level + amount)),
        last_active: new Date().toISOString(),
      };
      
      setSoul(updatedSoul);
      await AsyncStorage.setItem('soul', JSON.stringify(updatedSoul));
    } catch (error) {
      console.error('Error updating light level:', error);
    }
  };

  // Activate higher self
  const activateHigherSelf = async (trueName: string) => {
    if (!soul || soul.higher_self_activated) return;

    try {
      const updatedSoul = {
        ...soul,
        true_name: trueName,
        higher_self_activated: true,
        light_level: Math.min(100, soul.light_level + 20), // Bonus light for activation
        last_active: new Date().toISOString(),
      };
      
      setSoul(updatedSoul);
      await AsyncStorage.setItem('soul', JSON.stringify(updatedSoul));
    } catch (error) {
      console.error('Error activating higher self:', error);
    }
  };

  return {
    soul,
    loading,
    updateLightLevel,
    activateHigherSelf,
  };
});