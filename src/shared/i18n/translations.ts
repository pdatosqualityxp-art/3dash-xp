export const translations = {
  es: {
    home: 'Inicio',
    info: 'Información',
    description: 'Descripción',
    version: 'Ver 1.1',
    theme: 'Tema',
    language: 'Idioma',
    profile: 'xp qe',
  },
  ca: {
    home: 'Inici',
    info: 'Informació',
    description: 'Descripció',
    version: 'Versió 1.1',
    theme: 'Tema',
    language: 'Idioma',
    profile: 'xp qe',
  },
  en: {
    home: 'Home',
    info: 'Info',
    description: 'Description',
    version: 'Ver 1.1',
    theme: 'Theme',
    language: 'Language',
    profile: 'xp qe',
  },
} as const

export type Language = keyof typeof translations
