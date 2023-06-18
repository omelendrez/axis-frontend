import './tracking.css'

export const Tracking = ({ tracking }) => (
  <figure>
    <div className="table-title">History</div>
    <table role="grid" className="course-table">
      <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Updated by</th>
          <th scope="col">Updated on</th>
        </tr>
      </thead>
      <tbody>
        {tracking.map((t, i) => (
          <tr key={i}>
            <td>{t.status}</td>
            <td>{t.full_name}</td>
            <td>{t.updated}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </figure>
)
