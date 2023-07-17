import { Divider } from '@/components'

export const MenuOption = ({
  title,
  description,
  icon,
  path,
  onNavigate,
  divider
}) => (
  <>
    <article
      className="card home-item"
      onClick={(e) => {
        e.preventDefault()
        onNavigate(path)
      }}
    >
      <div>
        <span className="material-icons">{icon}</span>
      </div>
      <hgroup>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </hgroup>
    </article>
    {divider && <Divider />}
  </>
)
