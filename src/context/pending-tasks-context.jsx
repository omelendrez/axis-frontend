import { createContext, useState } from 'react'

export const PendingTasksContext = createContext({
  pendingTasksParams: {
    date: null,
    selectedStatuses: []
  },
  setPendingTasksParams: () => {}
})

export const PendingTasksProvider = ({ children }) => {
  const [pendingTasksParams, set] = useState()

  const setPendingTasksParams = (pendingParams) => set(pendingParams)

  return (
    <PendingTasksContext.Provider
      value={{
        pendingTasksParams,
        setPendingTasksParams
      }}
    >
      {children}
    </PendingTasksContext.Provider>
  )
}
