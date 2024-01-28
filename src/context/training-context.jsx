import { createContext, useState } from 'react'

export const TrainingContext = createContext({
  changes: { id: '', status: '' },
  setChanges: () => {}
})

export const TrainingProvider = ({ children }) => {
  const [changes, set] = useState()

  const setChanges = (changes) => set(changes)

  return (
    <TrainingContext.Provider
      value={{
        changes,
        setChanges
      }}
    >
      {children}
    </TrainingContext.Provider>
  )
}
