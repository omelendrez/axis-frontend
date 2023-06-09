import { Divider } from '@/components'

export const MenuOption = ({
  title,
  description,
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
      <hgroup>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </hgroup>
    </article>
    {divider && <Divider />}
  </>
)
