import useNotification from './useNotification'

const useApiMessages = () => {
  const { set } = useNotification()

  const apiMessage = (e) => {
    set({
      type: e?.response?.data?.message ? 'error' : 'info',
      message: e?.data?.message || e?.response?.data?.message
    })
  }

  return {
    apiMessage
  }
}

export default useApiMessages
