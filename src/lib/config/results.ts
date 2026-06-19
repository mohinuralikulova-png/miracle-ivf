import type { ResultConfig } from '@/types'

// To activate real media: set mediaSrc to an absolute path from /public.
// e.g. { id: 'result1', type: 'hcg', mediaSrc: '/images/results/hcg-1.jpg', mediaBlur: true }
// mediaBlur: true blurs the actual image for patient privacy (only applies when mediaSrc is set).
export const RESULTS: ResultConfig[] = [
  { id: 'result1', type: 'hcg', mediaBlur: true },
  { id: 'result2', type: 'hcg', mediaBlur: true },
  { id: 'result3', type: 'ivf' },
  { id: 'result4', type: 'ivf' },
  { id: 'result5', type: 'family' },
  { id: 'result6', type: 'gratitude' },
]
