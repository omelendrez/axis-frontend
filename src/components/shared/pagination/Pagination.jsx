import './pagination.css'
import { PAGE_SIZE } from '@/helpers'

export const Pagination = ({ onPage, page, limit, count }) => {
  const pages = Math.ceil(count / limit)

  return (
    <section className="pagination">
      <div>
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
      <div>
        <center>{`${count} records found`}</center>
        {count > PAGE_SIZE && (
          <center>{`Showing ${PAGE_SIZE} records per page`}</center>
        )}
      </div>
    </section>
  )
}
