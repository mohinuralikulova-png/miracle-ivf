// next-intl type augmentation.
// Makes t('...') key references type-safe against the UZ source dictionary.
// Any key that doesn't exist in uz.json will produce a TypeScript error.
import type uz from '../messages/uz.json'

type Messages = typeof uz

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
