import React, { useState, useEffect, createContext } from 'react'

export const ThemeContext = createContext({
  theme: '',
  toggle: () => {}
})

const inititalTheme = window.localStorage.getItem('theme') || 'light'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(inititalTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const applyTheme = (theme) => {
    const root = document.getElementsByTagName('html')[0]
    const body = document.getElementsByTagName('body')[0]
    body.style.cssText = 'transition: background .5s ease'
    root.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }

  const toggle = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
