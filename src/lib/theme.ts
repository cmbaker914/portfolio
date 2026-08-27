// Light/dark theme handling. The active theme is stored on the root element as
// data-theme='dark' (see tokens.css) and persisted to localStorage. Falls back
// to the OS preference the first time a visitor lands.

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function preferredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

export function setTheme(theme: Theme): void {
  applyTheme(theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

// Call once at startup, before the app mounts, to avoid a flash of the wrong theme.
export function initTheme(): void {
  applyTheme(preferredTheme())
}
