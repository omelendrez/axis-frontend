import { useEffect, useState } from 'react'
import { Confirm, Form } from '@/components'
// Ok
import useLearners from '@/hooks/useLearners'
import useStates from '@/hooks/useStates'
import useNationalities from '@/hooks/useNationalities'
import useCompanies from '@/hooks/useCompanies'
import useTitles from '@/hooks/useTitles'
import useNotification from '@/hooks/useNotification'
import { FOREIGNER, loadSchema } from '@/helpers'

import {
  sex as sexList,
  status as statusList,
  type as typeList
} from '@/static-lists'

import schema from './schema.json'

export const LearnerForm = ({ learner, onClose }) => {
  const { set } = useNotification()

  const { learners, add, modify } = useLearners()
  const { isLoading, isSuccess } = learners

  const { states, load: loadStates } = useStates()
  const { data: statList } = states

  const { titles, load: loadTitles } = useTitles()
  const { data: titList } = titles

  const { nationalities, load: loadNationalities } = useNationalities()
  const { data: natList } = nationalities

  const { companies, load: loadCompanies } = useCompanies()
  const { data: compList } = companies

  const [nationalitiesList, setNationalitiesList] = useState([])
  const [companiesList, setCompaniesList] = useState([])
  const [statesList, setStatesList] = useState([])
  const [titlesList, setTitlesList] = useState([])

  const [prevState, setPrevState] = useState(null)

  const initialValues = loadSchema(schema)

  const [values, setValues] = useState(initialValues)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [tempValue, setTempValue] = useState(null)

  useEffect(() => {
    if (learner) {
      Object.entries(learner).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [learner])

  useEffect(() => {
    loadStates()
    loadNationalities()
    loadCompanies()
    loadTitles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (natList.count) {
      setNationalitiesList(
        natList.rows.map((n) => ({
          id: n.id,
          name: n.nationality
        }))
      )
    }

    if (compList.count) {
      setCompaniesList(
        compList.rows.map((c) => ({
          id: c.id,
          name: c.name
        }))
      )
    }

    if (statList.count) {
      setStatesList(statList.rows)
    }

    if (titList.count) {
      setTitlesList(titList.rows.map((t) => ({ id: t.id, name: t.name })))
    }
  }, [natList, compList, statList, titList])

  useEffect(() => {
    if (isSuccess) {
      const message = {
        type: 'success',
        message: 'Record updated successfully'
      }
      set(message)
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { id, value } = e.target

    if (id === 'status') {
      setTempValue({ id, value, prev: learner?.status })
      setConfirmMessage('Are you sure you want to change learner status?')
      return setIsConfirmOpen(true)
    }

    const foreigner = statesList.find((s) => s.name === FOREIGNER)
    const nigerian = nationalitiesList.find((n) => n.name.includes('Nigerian'))

    if (id === 'state') {
      if (
        parseInt(values.nationality.value, 10) === nigerian?.id &&
        parseInt(value, 10) === foreigner.id
      ) {
        const message = {
          type: 'error',
          message: 'Nigerians cannot have state Foreigner'
        }
        set(message)
      }
      if (
        parseInt(values.nationality.value, 10) !== nigerian?.id &&
        parseInt(value, 10) !== foreigner.id
      ) {
        const data = { value: foreigner.id, error: '' }
        setValues((values) => ({ ...values, state: data }))
        const message = {
          type: 'error',
          message: 'Foreigners cannot have Nigerian state'
        }
        set(message)
      }
    }

    if (id === 'nationality') {
      if (parseInt(value, 10) !== nigerian?.id) {
        setPrevState(() => values.state.value)
        const data = { value: foreigner.id, error: '' }
        setValues((values) => ({ ...values, state: data }))
      } else {
        if (prevState) {
          const data = { value: prevState, error: '' }
          setValues((values) => ({ ...values, state: data }))
          setPrevState(null)
        }
      }
    }

    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    const { id, value } = tempValue
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
    setIsConfirmOpen(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()

    const { id, prev } = tempValue
    const value = prev
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))

    setTempValue(null)
    setIsConfirmOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (learner?.id) {
      modify(learner.id, payload)
    } else {
      add(payload)
    }
  }

  if (
    !nationalitiesList.length ||
    !statesList.length ||
    !companiesList.length ||
    !titlesList.length
  ) {
    return null
  }

  const options = {
    companiesList,
    nationalitiesList,
    sexList,
    statesList,
    statusList,
    typeList,
    titlesList
  }

  return (
    <>
      <Confirm
        open={isConfirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />
      <Form
        schema={schema}
        object={learner}
        isLoading={isLoading}
        onChange={handleChange}
        values={values}
        options={options}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </>
  )
}
