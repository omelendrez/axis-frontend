import './description-elements.css'

export const Button = ({ text, className }) => (
  <div className="buttons description-button-container">
    <button className={className}>{text}</button>
  </div>
)

export const CommonMessage = () => (
  <>
    Remember that once you click on an button you cannot revert/undone the
    action performed by the system.
  </>
)

export const FootMessage = () => (
  <i>
    If a button was clicked by mistake, you can ask a user with the System Admin
    role to undo your action.
  </i>
)
