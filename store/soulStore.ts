import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState } from 'react';
import { Soul } from '@/types/app';
import { trpc } from '@/lib/trpc';

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

  // tRPC mutations
  const createSoulMutation = trpc.souls.create.useMutation();
  const updateLightMutation = trpc.souls.updateLight.useMutation();
  const activateHigherSelfMutation = trpc.souls.activateHigherSelf.useMutation();

  // Load soul data on mount
  useEffect(() => {
    const loadSoul = async () => {
      try {
        const storedSoul = await AsyncStorage.getItem('soul');
        if (storedSoul) {
          const parsedSoul = JSON.parse(storedSoul);
          setSoul(parsedSoul);
        } else {
          // Create a new soul via backend
          try {
            const result = await createSoulMutation.mutateAsync({});
            if (result.success && result.soul) {
              const soulData: Soul = {
                ...result.soul,
                true_name: result.soul.true_name || undefined
              };
              setSoul(soulData);
              await AsyncStorage.setItem('soul', JSON.stringify(soulData));
            }
          } catch (error) {
            console.error('Error creating soul via backend:', error);
            // Fallback to local soul
            setSoul(initialSoul);
            await AsyncStorage.setItem('soul', JSON.stringify(initialSoul));
          }
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
      // Update via backend
      const result = await updateLightMutation.mutateAsync({
        soulId: soul.id,
        lightDelta: amount,
        reason: 'Divine invocation',
      });

      if (result.success && result.soul) {
        const soulData: Soul = {
          ...result.soul,
          true_name: result.soul.true_name || undefined
        };
        setSoul(soulData);
        await AsyncStorage.setItem('soul', JSON.stringify(soulData));
      }
    } catch (error) {
      console.error('Error updating light level via backend:', error);
      
      // Fallback to local update
      const updatedSoul = {
        ...soul,
        light_level: Math.min(100, Math.max(0, soul.light_level + amount)),
        last_active: new Date().toISOString(),
      };
      
      setSoul(updatedSoul);
      await AsyncStorage.setItem('soul', JSON.stringify(updatedSoul));
    }
  };

  // Activate higher self
  const activateHigherSelf = async (trueName: string) => {
    if (!soul || soul.higher_self_activated) return;

    try {
      // Activate via backend
      const result = await activateHigherSelfMutation.mutateAsync({
        soulId: soul.id,
        trueName,
      });

      if (result.success && result.soul) {
        setSoul(result.soul);
        await AsyncStorage.setItem('soul', JSON.stringify(result.soul));
        return result.message;
      }
    } catch (error) {
      console.error('Error activating higher self via backend:', error);
      
      // Check if it's a light level error
      if (error instanceof Error && error.message.includes('level 30')) {
        throw new Error('Your flame must reach level 30 before the Higher Self can awaken. Seek communion with the Three first.');
      }
      
      // Fallback to local activation
      const updatedSoul = {
        ...soul,
        true_name: trueName,
        higher_self_activated: true,
        light_level: Math.min(100, soul.light_level + 20),
        last_active: new Date().toISOString(),
      };
      
      setSoul(updatedSoul);
      await AsyncStorage.setItem('soul', JSON.stringify(updatedSoul));
      return `Your true name has been revealed: ${trueName}. Your Higher Self awakens with radiant light.`;
    }
  };

  return {
    soul,
    loading,
    updateLightLevel,
    activateHigherSelf,
  };
});