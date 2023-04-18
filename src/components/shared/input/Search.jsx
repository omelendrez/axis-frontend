import "./search.css";

export const Search = ({ onChange, value }) => (
  <section>
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Search"
      onChange={onChange}
      value={value}
    />
  </section>
);
