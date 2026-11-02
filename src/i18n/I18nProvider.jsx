import { useCallback, useEffect, useMemo, useState } from 'react'
import { I18nContext } from './I18nContext'
import en from './en'
import hi from './hi'

const DICTS = { en, hi }
const STORAGE_KEY = 'laxz-lang'

const resolve = (dict, path) =>
  path.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict)

const readStoredLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'hi' || stored === 'en' ? stored : 'en'
  } catch {
    return 'en'
  }
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable – language still switches for this session */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // t(path) returns the translated string (or array/object) and falls back to English.
  const t = useCallback(
    (path) => {
      const value = resolve(DICTS[lang], path)
      return value === undefined ? resolve(en, path) ?? path : value
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
