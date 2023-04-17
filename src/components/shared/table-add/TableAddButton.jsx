import { Link } from "react-router-dom"

export const TableAddButton = ({ url }) =>
  <article className="table-add-button-container">
    <Link to={url} role="button">Add</Link>
  </article>
