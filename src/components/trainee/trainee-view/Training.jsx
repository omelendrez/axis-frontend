const fields = [
  {
    label: 'Course',
    field: 'course'
  },
  {
    label: 'Start',
    field: 'start'
  },
  {
    label: 'Expiry',
    field: 'expiry'
  },
  {
    label: 'Certificate',
    field: 'certificate'
  },
  {
    label: 'Status',
    field: 'status'
  }
]

const Cell = ({ value }) => <td>{value}</td>

const Row = ({ training }) => (
  <tr>
    <td>
      <input type="checkbox" value={training.id} />
    </td>
    {fields.map((f) => (
      <Cell key={f.field} value={training[f.field]} />
    ))}
  </tr>
)

const Header = () => (
  <tr>
    <th>
      <span className="material-icons">check</span>
    </th>
    {fields.map((f) => (
      <th key={f.field} scope="col">
        {f.label}
      </th>
    ))}
  </tr>
)

export const Training = ({ trainings }) => {
  return (
    <article className="training">
      <h6 className="title">Training records</h6>

      <figure>
        <table role="grid">
          <thead>
            <Header />
          </thead>

          <tbody>
            {trainings.map((t) => (
              <Row key={t.id} training={t} />
            ))}
            {!trainings.length && (
              <tr>
                <td colSpan={fields.length + 1}>
                  <center>No records found</center>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </figure>
    </article>
  )
}
