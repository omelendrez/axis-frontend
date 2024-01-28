import { createContext, useState } from 'react'

export const NetworkContext = createContext({
  network: '',
  setNetwork: () => {}
})

export const NetworkProvider = ({ children }) => {
  const [network, set] = useState()

  const setNetwork = (network) => set(network)

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  )
}
