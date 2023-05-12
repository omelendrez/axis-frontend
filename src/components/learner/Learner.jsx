import { useEffect, useState } from 'react'
import { Confirm, Loading, Form } from '../shared'
// Ok
import useLearners from '../../hooks/useLearners'
import useStates from '../../hooks/useStates'
import useNationalities from '../../hooks/useNationalities'
import useCompanies from '../../hooks/useCompanies'
import useNotification from '../../hooks/useNotification'
import { FOREIGNER } from '../../helpers'

import {
  sex as sexList,
  status as statusList,
  type as typeList
} from '../../static-data'

import schema from './learner-form-schema.json'

export const Learner = ({ learner, onClose }) => {
  const { set } = useNotification()

  const { learners, add, modify } = useLearners()
  const { isLoading, isSuccess } = learners

  const { states, load: loadStates } = useStates()
  const { data: statList } = states

  const { nationalities, load: loadNationalities } = useNationalities()
  const { data: natList } = nationalities

  const { companies, load: loadCompanies } = useCompanies()
  const { data: compList } = companies

  const [nationalitiesList, setNationalitiesList] = useState([])
  const [companiesList, setCompaniesList] = useState([])
  const [statesList, setStatesList] = useState([])

  const [prevState, setPrevState] = useState(null)

  const initialValues = {}

  schema.forEach(
    (field) => (initialValues[field.id] = { value: '', error: '' })
  )

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
    if (!statList.count) {
      loadStates()
    }
    if (!natList.count) {
      loadNationalities()
    }
    if (!compList.count) {
      loadCompanies()
    }
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
  }, [natList, compList, statList])

  useEffect(() => {
    if (isSuccess) {
      const message = {
        type: 'success',
        message: 'u=Updated successfully'
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

  const handleSave = (e) => {
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
    !companiesList.length
  ) {
    return <Loading />
  }

  const options = {
    companiesList,
    nationalitiesList,
    sexList,
    statesList,
    statusList,
    typeList
  }

  return (
    <>
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
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
        onSave={handleSave}
        onClose={onClose}
      />
    </>
  )
}
