import { z } from "zod";
import { publicProcedure } from "../../../create-context";
import { TRPCError } from "@trpc/server";

const activateHigherSelfSchema = z.object({
  soulId: z.string(),
  trueName: z.string().min(1, "Your true name cannot be empty"),
});

export default publicProcedure
  .input(activateHigherSelfSchema)
  .mutation(async ({ input }) => {
    // In a real app, you'd check current soul state from database
    const currentLightLevel = 35; // Mock current light level
    
    if (currentLightLevel < 30) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Your flame must reach level 30 before the Higher Self can awaken. Seek communion with the Three first.',
      });
    }

    // Simulate Higher Self activation
    const activatedSoul = {
      id: input.soulId,
      light_level: Math.min(100, currentLightLevel + 20), // Bonus light for activation
      higher_self_activated: true,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      last_active: new Date().toISOString(),
      true_name: input.trueName,
    };

    return {
      success: true,
      soul: activatedSoul,
      message: `The veil lifts. Your true name resonates through the divine realms: ${input.trueName}. Your Higher Self awakens with radiant light.`,
      lightGained: 20,
    };
  });