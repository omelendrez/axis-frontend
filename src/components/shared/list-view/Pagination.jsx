import './pagination.css'

export const Pagination = ({ onPage, page, pages }) => {
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
