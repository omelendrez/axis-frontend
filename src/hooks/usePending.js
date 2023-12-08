import { useEffect, useState } from 'react'

import { SP, KEYS } from '@/services'

const session = new SP()

const initialState = {
  date: null,
  selectedStatuses: []
}

const usePending = () => {
  const key = KEYS.pending

  let lastPag = session.get(key)

  lastPag = !lastPag
    ? initialState
    : { ...lastPag, date: !!lastPag.date ? new Date(lastPag.date) : null }

  const [pending, setPendings] = useState(lastPag)

  useEffect(() => {
    if (pending) {
      session.save(key, pending)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])

  const setPending = (values) => {
    setPendings(values)
  }

  return {
    pending,
    setPending
  }
}

export default usePending
