import { Button, CommonMessage, FootMessage } from '../description-elements'

const Ok = () => <Button text="Fit" />

const NotOk = () => <Button text="No fit" className="delete" />

const text = (
  <>
    <ol>
      <li>
        Enter the systolic and diastolic blood pressure measured in the
        respective fields.
      </li>
      <li>
        Click on <Ok /> to confirm that the learner is apt to performer the
        training course.
      </li>
      <li>
        Click on <NotOk /> to confirm the learner
        <strong> is NOT FIT to perform the training course </strong>.
      </li>
      <li>
        <CommonMessage />
      </li>
    </ol>
    <FootMessage />
  </>
)

export default text
