import './search.css'

export const Search = (props) => (
  <section className="search">
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Search"
      {...props}
    />
  </section>
)
