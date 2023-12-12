import './treemap-tooltip.css'

export const Tooltip = ({ data, position }) => {
  const { category, name, value } = data

  return (
    <section
      className="treemap-tooltip"
      style={{ top: position.top, left: position.left }}
    >
      <div>{category}</div>
      <div>{name}</div>
      <div>{value} learners</div>
    </section>
  )
}
