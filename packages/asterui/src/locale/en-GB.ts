import type { Locale } from './index'
import enUS from './en-US'

const enGB: Locale = {
  ...enUS,
  locale: 'en-GB',

  // British English overrides
  // Most UI strings are identical, but override here if needed
}

export default enGB
