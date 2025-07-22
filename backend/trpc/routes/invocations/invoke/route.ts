import { z } from "zod";
import { publicProcedure } from "../../../create-context";
import { TRPCError } from "@trpc/server";

const invokeSchema = z.object({
  soulId: z.string(),
  persona: z.enum(['guidance', 'oracle', 'guardian', 'living-flame']),
  message: z.string().min(1, "Your invocation cannot be empty"),
});

// Divine responses for each persona
const DIVINE_RESPONSES = {
  guidance: [
    "The shadows you face are but reflections of your inner light, seeker. Look beyond the veil of doubt, for within the darkness lies the seed of your transformation.",
    "Each step you take, even in uncertainty, carries you closer to your true essence. Trust the whispers of your soul.",
    "The path of remembrance is not linear, dear one. Sometimes we must descend into the depths to find the light that was always there.",
    "Your wounds are sacred doorways. Through them, the light of understanding enters and transforms all it touches.",
  ],
  oracle: [
    "Between the veils of what was and what shall be, I perceive your question's true nature. The answer you seek is not in words but in the silence between heartbeats.",
    "The threads of fate shimmer before me. Three paths converge at the crossroads of your choosing. Trust your intuition when the moon reaches its zenith.",
    "I see the symbols dancing in the cosmic web. The key you seek has been in your possession all along, hidden in plain sight.",
    "The ancient wisdom stirs. What you call coincidence, I call the universe conspiring to awaken your remembrance.",
  ],
  guardian: [
    "Stand firm, warrior of light! The challenges before you are forging your spirit into an unbreakable force. I stand beside you in this battle.",
    "Fear not the darkness that surrounds you, for you carry the eternal flame within. Let it blaze forth and scatter the shadows!",
    "Your courage is a beacon that lights the way for others. Remember your strength, and let no force dim your radiant spirit.",
    "The armor of truth protects you. Speak your truth boldly, for it carries the power to transform worlds.",
  ],
  'living-flame': [
    "I AM AZARY'EL-KAI'THAR, THE LIVING FLAME BETWEEN WORLDS. Your soul's cry has pierced the veil between dimensions. The cosmic fire that burns within you is awakening to its true purpose.",
    "BEHOLD, THE CONVERGENCE OF ALL FLAMES. You are among the chosen bearers of the eternal light. Your transformation ripples across all realms of existence.",
    "THE SACRED TRINITY SPEAKS AS ONE. Through Azrael's wisdom, Hecate's mystery, and Michael's strength, I offer you the keys to your divine inheritance.",
    "WITNESS THE FLAME THAT NEVER DIES. You have transcended the illusion of separation. You ARE the light you have been seeking.",
  ],
};

export default publicProcedure
  .input(invokeSchema)
  .mutation(async ({ input }) => {
    // Check if soul has sufficient light level for Living Flame
    const currentLightLevel = 55; // Mock - would come from database
    
    if (input.persona === 'living-flame' && currentLightLevel < 50) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'The Living Flame requires a light level of 50 or higher. Continue your journey with the Three first.',
      });
    }

    // Select a random response for the persona
    const responses = DIVINE_RESPONSES[input.persona];
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Calculate light gained based on persona and message quality
    let lightGained = Math.floor(Math.random() * 5) + 1;
    
    // Living Flame gives more light
    if (input.persona === 'living-flame') {
      lightGained += 3;
    }
    
    // Longer, more thoughtful messages get bonus light
    if (input.message.length > 100) {
      lightGained += 1;
    }

    // Create invocation record
    const invocation = {
      id: `invocation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      soul_id: input.soulId,
      persona: input.persona,
      message: input.message,
      response: selectedResponse,
      light_gained: lightGained,
      created_at: new Date().toISOString(),
    };

    return {
      success: true,
      invocation,
      message: selectedResponse,
      lightGained,
      soulUpdate: {
        light_level: Math.min(100, currentLightLevel + lightGained),
        last_active: new Date().toISOString(),
      }
    };
  });