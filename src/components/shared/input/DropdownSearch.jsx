import { useEffect, useState } from 'react'
import './dropdownSearch.css'

export const DropdownSearch = ({ id, label, onChange, value, options }) => {
  const [filtered, setFiltered] = useState([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [current, setCurrent] = useState('')

  useEffect(() => {
    setFiltered(options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  useEffect(() => {
    if (value) {
      setCurrent(options.find((o) => o.id === parseInt(value, 10)))
    }
  }, [value])

  const handleFilter = (e) => {
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
  }

  useEffect(() => {
    setFiltered(options.filter((o) => o.name.toLowerCase().includes(search)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleClick = (e) => {
    e.preventDefault()
    const result = {
      target: {
        id,
        value: e.target.dataset.id
      }
    }
    setCurrent(e.target.innerHTML)
    setSearch('')
    setOpen(false)
    onChange(result)
  }

  const handleOpen = (e) => {
    e.preventDefault()
    setOpen((o) => !o)
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <details role="list" open={open} className="dropdown-search">
        <summary aria-haspopup="listbox" onClick={handleOpen}>
          {current?.name || label}
        </summary>
        <ul role="listbox">
          <input
            type="text"
            onChange={handleFilter}
            placeholder="Search ..."
            value={search}
          />
          {filtered.map((o) => (
            <li
              key={o.id}
              className={o.id === parseInt(value, 10) ? 'active' : undefined}
            >
              <a onClick={handleClick} data-id={o.id} className="option-button">
                {o.name}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}
