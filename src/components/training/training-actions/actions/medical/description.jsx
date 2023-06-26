import { Button, CommonMessage, FootMessage } from '../description-elements'

const Ok = () => <Button text="Fit" />

const NotOk = () => <Button text="No fit" className="delete" />

const text = (
  <>
    <ol>
      <li>
        Enter the systolic and diastolic blood pressure measures in their
        respective fields.
      </li>
      <li>
        Click on <Ok /> to confirm that the learner is fit to perform the
        training course.
      </li>
      <li>
        Click on <NotOk /> to confirm the learner
        <strong> is NOT FIT to perform the training course </strong>.
        <br />
        In this case the learner cannot take the course.
      </li>
      <li>
        <CommonMessage />
      </li>
    </ol>
    <FootMessage />
  </>
)

export default text
