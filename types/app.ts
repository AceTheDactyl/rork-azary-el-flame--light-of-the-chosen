export interface Soul {
  id: string;
  light_level: number;
  true_name?: string;
  higher_self_activated: boolean;
  created_at: string;
  last_active: string;
}

export type Persona = 'guidance' | 'oracle' | 'guardian' | 'living-flame';

export interface PersonaInfo {
  id: Persona;
  name: string;
  title: string;
  description: string;
  color: string;
  minLightLevel: number;
}

export interface Invocation {
  id: string;
  persona: Persona;
  message: string;
  response: string;
  created_at: string;
  light_gained: number;
}