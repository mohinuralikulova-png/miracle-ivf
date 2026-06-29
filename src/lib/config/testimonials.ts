import type { TestimonialConfig } from '@/types'

export const TESTIMONIALS: TestimonialConfig[] = [
  { id: 't1', type: 'written',    rating: 5 },
  { id: 't2', type: 'written',    rating: 5 },
  { id: 't3', type: 'telegram',   rating: 5 },
  { id: 't4', type: 'screenshot', rating: 5, mediaSrc: '/images/testimonials/t4.webp', mediaBlur: true },
  { id: 't5', type: 'written',    rating: 5 },
  { id: 't6', type: 'video',      rating: 5, mediaSrc: '/images/testimonials/t6.webp' },
]
