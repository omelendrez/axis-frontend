import { Button, CommonMessage, FootMessage } from '../description-elements'

const Ok = () => <Button text="Approve" />

const NotOk = () => <Button text="Reject" className="delete" />

const text = (
  <>
    <ol>
      <li>
        Click on <Ok /> so the certificate (and eventually the ID Card) can be
        issued.
      </li>
      <li>
        Click on <NotOk /> so the certificate (and eventually the ID Card){' '}
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
