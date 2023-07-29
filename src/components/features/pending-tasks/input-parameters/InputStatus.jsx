import { StatusSwitcher } from '..'

export const InputStatus = ({ statuses, onChange, selected }) => (
  <section className="pending-tasks-statuses">
    <h6>Status to include</h6>
    {statuses.map((status) => (
      <StatusSwitcher
        key={status.id}
        id={status.id}
        label={`${status.status}, ${status.state}`}
        value={selected.includes(status.id) ? 1 : 0}
        onChange={onChange}
      />
    ))}
  </section>
)
