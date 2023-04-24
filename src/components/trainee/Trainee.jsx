import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  InputField,
  Confirm,
  FormButtonRow,
  Dropdown,
  DropdownSearch,
  SaveButton,
  CancelButton
} from '../shared'

import useTrainees from '../../hooks/useTrainees'
import useStates from '../../hooks/useStates'
import useNationalities from '../../hooks/useNationalities'
import useCompanies from '../../hooks/useCompanies'
import useNotification from '../../hooks/useNotification'

import {
  sex as sexList,
  status as statusList,
  type as typeList
} from '../../static-data'

const initialValues = {
  type: {
    value: '',
    error: ''
  },
  badge: {
    value: '',
    error: ''
  },
  last_name: {
    value: '',
    error: ''
  },
  first_name: {
    value: '',
    error: ''
  },
  sex: {
    value: '',
    error: ''
  },
  state: {
    value: '',
    error: ''
  },
  nationality: {
    value: '',
    error: ''
  },
  birth_date: {
    value: '',
    error: ''
  },
  company: {
    value: '',
    error: ''
  },
  status: {
    value: '',
    error: ''
  }
}

export const Trainee = ({ trainee }) => {
  const { set } = useNotification()

  const { trainees, add, modify } = useTrainees()
  const { isLoading, isSuccess } = trainees

  const { states, load: loadStates } = useStates()
  const { data: statesList } = states

  const { nationalities, load: loadNationalities } = useNationalities()
  const { data: natList } = nationalities

  const { companies, load: loadCompanies } = useCompanies()
  const { data: compList } = companies

  const [nationalitiesList, setNationalitiesList] = useState([])
  const [companiesList, setCompaniesList] = useState([])
  const [prevState, setPrevState] = useState(null)

  const [values, setValues] = useState(initialValues)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [tempValue, setTempValue] = useState(null)
  const navigate = useNavigate()
  const formRef = useRef()

  useEffect(() => {
    if (trainee) {
      Object.entries(trainee).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [trainee])

  useEffect(() => {
    if (!statesList.length) {
      loadStates()
    }
    if (!natList.length) {
      loadNationalities()
    }
    if (!compList.length) {
      loadCompanies()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () =>
      setNationalitiesList(
        natList.map((n) => ({
          id: n.id,
          name: n.nationality
        }))
      ),
    [natList]
  )

  useEffect(
    () =>
      setCompaniesList(
        compList.map((c) => ({
          id: c.code,
          name: c.name
        }))
      ),
    [compList]
  )

  useEffect(() => {
    if (isSuccess) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChange = (e) => {
    const { id, value } = e.target

    if (id === 'status') {
      setTempValue({ id, value, prev: trainee?.status })
      setConfirmMessage('Are you sure you want to change trainee status?')
      return setIsConfirmOpen(true)
    }

    const foreigner = statesList.find((s) => s.name === '- Foreigner -')
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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (trainee?.id) {
      modify(trainee.id, payload)
    } else {
      add(payload)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    formRef.current.submit()
  }

  const handleFormCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />

      <form onSubmit={handleFormSubmit} ref={formRef}>
        <Dropdown
          id="type"
          label="Type"
          onChange={handleChange}
          value={values.type.value}
          options={typeList}
          required
        />
        {trainee?.id && (
          <InputField
            type="text"
            id="badge"
            label="Badge"
            placeholder="Enter badge"
            value={values.badge.value}
            onChange={handleChange}
            required
          />
        )}

        <InputField
          type="text"
          id="last_name"
          label="Last name"
          placeholder="Enter last name"
          value={values.last_name.value}
          onChange={handleChange}
          required
        />

        <InputField
          type="text"
          id="first_name"
          label="First name"
          placeholder="Enter first name"
          value={values.first_name.value}
          onChange={handleChange}
          required
        />

        <Dropdown
          id="sex"
          label="Sex"
          onChange={handleChange}
          value={values.sex.value}
          options={sexList}
          required
        />

        <Dropdown
          id="nationality"
          label="Nationality"
          onChange={handleChange}
          value={values.nationality.value}
          options={nationalitiesList}
          required
        />

        <DropdownSearch
          id="state"
          label="State"
          onChange={handleChange}
          value={values.state.value}
          options={statesList}
          required
        />

        <InputField
          type="date"
          id="birth_date"
          label="Birth date"
          placeholder="Enter birth date"
          value={values.birth_date.value}
          onChange={handleChange}
          required
        />

        <Dropdown
          id="company"
          label="Company"
          onChange={handleChange}
          value={values.company.value}
          options={companiesList}
          required
        />
        {trainee?.id && (
          <Dropdown
            id="status"
            label="Status"
            onChange={handleChange}
            value={values.status.value}
            options={statusList}
          />
        )}
        <FormButtonRow>
          <SaveButton isSubmitting={isLoading} onSave={handleSave} />

          <CancelButton isSubmitting={isLoading} onCancel={handleFormCancel} />
        </FormButtonRow>
      </form>
    </>
  )
}
