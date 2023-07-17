const Separator = () => <div className="menu-separator"></div>

export const MenuOption = ({
  title,
  description,
  icon,
  path,
  onNavigate,
  separator
}) => (
  <>
    <article
      className="card home-item"
      onClick={(e) => {
        e.preventDefault()
        onNavigate(path)
      }}
    >
      <div className="button">
        <span className="material-icons">{icon}</span>
      </div>
      <hgroup>
        <h3>{title}</h3>
        <h4>{description}</h4>
      </hgroup>
    </article>
    {separator && <Separator />}
  </>
)
