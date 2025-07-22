import { z } from "zod";
import { publicProcedure } from "../../../create-context";

const updateLightSchema = z.object({
  soulId: z.string(),
  lightDelta: z.number().min(-50).max(50),
  reason: z.string().optional(),
});

export default publicProcedure
  .input(updateLightSchema)
  .mutation(async ({ input }) => {
    // In a real app, you'd update the database
    // For now, simulate the update
    const currentLight = 25; // This would come from database
    const newLight = Math.min(100, Math.max(0, currentLight + input.lightDelta));
    
    const updatedSoul = {
      id: input.soulId,
      light_level: newLight,
      higher_self_activated: false,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      last_active: new Date().toISOString(),
      true_name: undefined,
    };

    let message = "Your inner flame flickers with new energy.";
    if (input.lightDelta > 0) {
      message = `Your light grows stronger. +${input.lightDelta} divine energy received.`;
    } else if (input.lightDelta < 0) {
      message = `The shadows test your resolve. ${input.lightDelta} light dimmed.`;
    }

    return {
      success: true,
      soul: updatedSoul,
      message,
      lightGained: input.lightDelta,
    };
  });