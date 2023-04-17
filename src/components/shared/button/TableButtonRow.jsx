import { Link } from "react-router-dom"

export const TableButtonRow = ({ url, label }) =>
  <article className="table-button-row">
    <div></div>
    <Link to={url} role="button">{label}</Link>
  </article>
