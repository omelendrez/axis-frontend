import { useEffect, useState, useRef } from 'react'
import './dropdownSearch.css'

export const DropdownSearch = ({ id, label, onChange, value, options }) => {
  const [filtered, setFiltered] = useState([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [current, setCurrent] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    if (options.count) {
      setFiltered(options.rows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  useEffect(() => {
    if (options.count && value) {
      setCurrent(
        options.rows.find((o) => parseInt(o.id, 10) === parseInt(value, 10))
      )
    }
  }, [value, options])

  const handleFilter = (e) => {
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
  }

  useEffect(() => {
    setFiltered(
      options.rows.filter((o) => o.name.toLowerCase().includes(search))
    )
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

  useEffect(() => {
    if (open) {
      searchRef.current.focus()
    }
  }, [open])

  return (
    <>
      <label htmlFor={id}>{label}</label>
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
              <button
                onClick={handleClick}
                data-id={o.id}
                className="option-button"
              >
                {o.name}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}
