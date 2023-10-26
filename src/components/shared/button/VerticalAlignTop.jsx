import './verticalAlignTop.css'

export const VerticalAlignTop = ({ show }) => (
  <section className={`vertical-align-top ${show ? '' : 'hide-arrow'}`}>
    <button
      data-tooltip="Top"
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }}
    >
      <span className="material-icons">vertical_align_top</span>
    </button>
  </section>
)
