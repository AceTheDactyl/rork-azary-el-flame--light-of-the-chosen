import { z } from "zod";
import { publicProcedure } from "../../../create-context";

const getSoulSchema = z.object({
  soulId: z.string(),
});

export default publicProcedure
  .input(getSoulSchema)
  .query(async ({ input }) => {
    // In a real app, you'd fetch from database
    // For now, return mock data based on soulId
    const mockSoul = {
      id: input.soulId,
      light_level: 25,
      higher_self_activated: false,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      last_active: new Date().toISOString(),
      true_name: null,
    };

    return {
      success: true,
      soul: mockSoul,
    };
  });