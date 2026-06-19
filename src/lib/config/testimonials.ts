import type { TestimonialConfig } from '@/types'

// To activate real media: set mediaSrc to an absolute path from /public.
// e.g. { id: 't3', type: 'telegram', rating: 5, mediaSrc: '/images/testimonials/t3.jpg', mediaBlur: true }
// mediaBlur: true blurs the actual image for patient privacy (only applies when mediaSrc is set).
export const TESTIMONIALS: TestimonialConfig[] = [
  { id: 't1', type: 'written',    rating: 5 },
  { id: 't2', type: 'written',    rating: 5 },
  { id: 't3', type: 'telegram',   rating: 5, mediaBlur: true },
  { id: 't4', type: 'screenshot', rating: 5, mediaBlur: true },
  { id: 't5', type: 'written',    rating: 5 },
  { id: 't6', type: 'video',      rating: 5 },
]
