import { Button, CommonMessage, FootMessage } from '../description-elements'

const Ok = () => <Button text="Approve" />

const text = (
  <>
    <ol>
      <li>
        Click on <Ok /> so the certificate (and eventually the ID Card) can be
        issued.
      </li>
      <li>
        <CommonMessage />
      </li>
    </ol>
    <FootMessage />
  </>
)

export default text
