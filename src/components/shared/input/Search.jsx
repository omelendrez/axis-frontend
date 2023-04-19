import "./search.css";

export const Search = (props) => (
  <section>
    <input
      type="search"
      id="search"
      name="search"
      placeholder="Search"
      {...props}
    />
  </section>
);
