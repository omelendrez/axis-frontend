import './tag.css'
export const Tag = ({ className, children }) => (
  <div className={`tag ${className ? className.toLowerCase() : ''}`}>
    {children}
  </div>
)
