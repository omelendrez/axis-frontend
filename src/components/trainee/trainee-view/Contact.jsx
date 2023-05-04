export const Contact = ({ contactInfos }) => {
  return (
    <article className="contact">
      <h6 className="title">Contact info</h6>
      <div>
        {contactInfos.map((ci) => (
          <div className="row-line" key={ci.type}>
            <span>{`${ci.type}`}:</span>
            <span>{`${ci.value}`}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
