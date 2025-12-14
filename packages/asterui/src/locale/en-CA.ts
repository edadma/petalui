import type { Locale } from './index'
import enGB from './en-GB'

const enCA: Locale = {
  ...enGB,
  locale: 'en-CA',

  // Canadian English overrides (inherits British spelling)
  // Override here if needed
}

export default enCA
