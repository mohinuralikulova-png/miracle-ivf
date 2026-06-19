import type { ServiceConfig } from '@/types'

export const SERVICES: ServiceConfig[] = [
  { id: 'ivf',          icon: 'Microscope'   },
  { id: 'diagnostics',  icon: 'SearchCheck'  },
  { id: 'female',       icon: 'HeartPulse'   },
  { id: 'male',         icon: 'Activity'     },
  { id: 'preparation',  icon: 'ClipboardList' },
  { id: 'pgt',          icon: 'Dna'          },
  { id: 'hysteroscopy', icon: 'Scan'         },
  { id: 'hormones',     icon: 'FlaskConical' },
  { id: 'gynConsult',   icon: 'Stethoscope'  },
  { id: 'androConsult', icon: 'UserCheck'    },
]

export const SERVICE_ICON_BY_ID = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.icon]),
) as Record<(typeof SERVICES)[number]['id'], (typeof SERVICES)[number]['icon']>
