import { KEYS, SP } from '@/services'

import { createContext, useState } from 'react'

export const UserContext = createContext({
  user: undefined,
  setUser: () => {}
})

export const UserProvider = ({ children }) => {
  const session = new SP()
  const currentUser = session.get(KEYS.user) || null

  const [user, set] = useState(currentUser || undefined)

  const setUser = (user) => set(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
