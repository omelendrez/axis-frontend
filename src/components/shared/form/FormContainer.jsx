import './formContainer.css'

export const FormContainer = ({ title, children, noMobile = false }) => (
  <article className={`form-container ${noMobile ? 'no-mobile' : undefined}`}>
    <h3>{title}</h3>
    {children}
  </article>
)
