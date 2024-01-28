import { createContext, useState } from 'react'

export const PageContext = createContext({
  page: '',
  setPage: () => {}
})

export const PageProvider = ({ children }) => {
  const [page, set] = useState()

  const setPage = (page) => set(page)

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  )
}
