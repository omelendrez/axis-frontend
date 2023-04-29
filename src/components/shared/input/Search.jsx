import './search.css'

export const Search = (props) => (
  <section className={`search ${props.className}`}>
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Search"
      {...props}
    />
  </section>
)
