import './pagination.css'

export const Pagination = ({ onPage, page, limit, count }) => {
  const numPages = count / limit
  const intPages = Math.floor(count / limit)
  const hasExtraRows = intPages !== numPages
  const pages = intPages + (hasExtraRows ? 1 : 0)

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPage(-1)}
        disabled={page === 1}
      >
        <span className="material-icons">chevron_left</span>
      </button>
      <div className="pagination-page">{`Page ${page} of ${pages}`}</div>
      <button
        className="pagination-button"
        onClick={() => onPage(1)}
        disabled={page === pages}
      >
        <span className="material-icons">chevron_right</span>
      </button>
    </div>
  )
}
