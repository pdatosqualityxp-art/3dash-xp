import ca from './ca.json'
import en from './en.json'
import es from './es.json'

export const translations = {
  ca,
  en,
  es,
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof ca
