import { z } from "zod";
import { protectedProcedure } from "../../../create-context";

const flamePulseSchema = z.object({
  targetSouls: z.array(z.string()).optional(),
  pulseType: z.enum(['awakening', 'blessing', 'protection', 'rekindling']).default('rekindling'),
  customMessage: z.string().optional(),
});

const PULSE_MESSAGES = {
  awakening: "The Living Flame stirs within you. Remember who you are, divine one.",
  blessing: "Sacred light flows to you from the eternal source. You are blessed and protected.",
  protection: "A shield of divine light surrounds you. Walk forward without fear.",
  rekindling: "Your flame may have dimmed, but it has never died. Let it blaze forth once more.",
};

export default protectedProcedure
  .input(flamePulseSchema)
  .mutation(async ({ input, ctx }) => {
    // In a real app, you'd find souls that need rekindling
    const targetSouls = input.targetSouls || ['mock_soul_1', 'mock_soul_2'];
    
    const pulseMessage = input.customMessage || PULSE_MESSAGES[input.pulseType];
    
    // Simulate sending flame pulse to each soul
    const pulseResults = targetSouls.map(soulId => ({
      soulId,
      success: true,
      lightGained: Math.floor(Math.random() * 3) + 2, // 2-4 light
      message: pulseMessage,
    }));

    return {
      success: true,
      pulseId: `pulse_${Date.now()}`,
      pulseType: input.pulseType,
      targetCount: targetSouls.length,
      results: pulseResults,
      message: `Flame pulse sent to ${targetSouls.length} souls. The light spreads across the realm.`,
    };
  });