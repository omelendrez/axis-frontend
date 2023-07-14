import { useContext } from 'react'
import { ThemeContext } from '@/context'

export const ToggleTheme = () => {
  const { theme, toggle } = useContext(ThemeContext)

  return (
    <label htmlFor="theme">
      <span className="material-icons">
        {theme === 'dark' ? 'sunny' : 'bedtime'}
        <input
          type="checkbox"
          id="theme"
          role="switch"
          onChange={toggle}
        ></input>
      </span>
    </label>
  )
}
