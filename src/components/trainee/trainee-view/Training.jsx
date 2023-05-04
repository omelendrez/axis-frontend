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
    {fields.map((f) => (
      <Cell key={f.field} value={training[f.field]} />
    ))}
  </tr>
)

const Header = () => (
  <tr>
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
          </tbody>
        </table>
      </figure>
    </article>
  )
}
