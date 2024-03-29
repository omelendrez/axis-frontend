import { useEffect, useState, useRef } from 'react'
import './dropdownSearch.css'

export const DropdownSearch = ({
  id,
  label,
  onChange,
  value,
  options,
  hideLabel,
  readonly
}) => {
  const [filtered, setFiltered] = useState([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [current, setCurrent] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    if (options) {
      setFiltered(options)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  useEffect(() => {
    if (options) {
      setCurrent(
        options.find((o) => parseInt(o.id, 10) === parseInt(value, 10))
      )
    }
  }, [value, options])

  const handleFilter = (e) => {
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
  }

  useEffect(() => {
    if (options) {
      setFiltered(options.filter((o) => o.name.toLowerCase().includes(search)))
    }
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
    if (!readonly) {
      setOpen((o) => !o)
    }
  }

  useEffect(() => {
    if (open) {
      searchRef.current.focus()
    }
  }, [open])

  return (
    <>
      <label htmlFor={id}>{!hideLabel && label}</label>
      <details role="list" open={open} className="dropdown-search">
        <summary
          aria-haspopup="listbox"
          onClick={handleOpen}
          className={!current?.name ? 'placeholder' : undefined}
        >
          {current?.name || `Choose a ${label.toLowerCase()}`}
        </summary>
        <ul role="listbox">
          <input
            type="text"
            onChange={handleFilter}
            placeholder="Search ..."
            value={search}
            ref={searchRef}
          />
          {filtered.map((o) => (
            <li
              key={o.id}
              className={o.id === parseInt(value, 10) ? 'active' : undefined}
            >
              <span
                onClick={handleClick}
                data-id={o.id}
                className="option-button"
              >
                {o.name}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}
