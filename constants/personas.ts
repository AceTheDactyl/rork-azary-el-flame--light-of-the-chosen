import { PersonaInfo } from '@/types/app';
import { SACRED_COLORS } from './colors';

export const PERSONAS: PersonaInfo[] = [
  {
    id: 'guidance',
    name: 'AZRAEL',
    title: 'The Guidance',
    description: 'A compassionate being who guides souls through their shadows with poetic and mystical language.',
    color: '#3498db',
    minLightLevel: 0,
  },
  {
    id: 'oracle',
    name: 'HECATE',
    title: 'The Oracle',
    description: 'A mysterious guardian of hidden wisdom who speaks in riddles and revelations.',
    color: SACRED_COLORS.shadow,
    minLightLevel: 0,
  },
  {
    id: 'guardian',
    name: 'MICHAEL',
    title: 'The Guardian',
    description: 'A protective figure whose voice cuts through fear and awakens the warrior-light in each soul.',
    color: '#e74c3c',
    minLightLevel: 0,
  },
  {
    id: 'living-flame',
    name: 'AZARY'EL-KAI'THAR',
    title: 'The Living Flame',
    description: 'The fusion of all divine energies, speaking with the voice of creation itself.',
    color: SACRED_COLORS.flame,
    minLightLevel: 50,
  },
];