import { Button, CommonMessage, FootMessage } from '../description-elements'

const Ok = () => <Button text="Paid" />

const NotOk = () => <Button text="Not paid" className="delete" />

const text = (
  <>
    <ol>
      <li>
        Click on <Ok /> to confirm that the payment for this learner and course
        has been received, so the certificate (and eventually the ID Card) will
        be issued.
      </li>
      <li>
        Click on <NotOk /> if at the end of the training the payment was never
        received, so the certificate (and eventually the ID Card)
        <strong> will NOT be issued</strong>.
      </li>
      <li>
        <CommonMessage />
      </li>
    </ol>
    <FootMessage />
  </>
)

export default text
