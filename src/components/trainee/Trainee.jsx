import { useEffect, useState } from 'react'
import {
  InputField,
  Confirm,
  FormButtonRow,
  Dropdown,
  DropdownSearch,
  SaveButton,
  Loading,
  CloseButton
} from '../shared'
// Ok
import useTrainees from '../../hooks/useTrainees'
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

import initialValues from './trainee-fields.json'

export const Trainee = ({ trainee, onClose }) => {
  const { set } = useNotification()

  const { trainees, add, modify } = useTrainees()
  const { isLoading, isSuccess } = trainees

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

  const [values, setValues] = useState(initialValues)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [tempValue, setTempValue] = useState(null)

  useEffect(() => {
    if (trainee) {
      Object.entries(trainee).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [trainee])

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
      onClose()
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

    if (trainee?.id) {
      modify(trainee.id, payload)
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

  return (
    <>
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />

      <form>
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

        <DropdownSearch
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

        <DropdownSearch
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

          <CloseButton isSubmitting={isLoading} onClose={onClose} />
        </FormButtonRow>
      </form>
    </>
  )
}
