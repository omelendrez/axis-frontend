import useNoficication from './useNotification'

const useApiMessages = () => {
  const { set } = useNoficication()

  const apiMessage = (e) => {
    set({
      type: e?.response?.data?.message ? 'error' : 'success',
      message: e?.data?.message || e?.response?.data?.message
    })
  }

  return {
    apiMessage
  }
}

export default useApiMessages
