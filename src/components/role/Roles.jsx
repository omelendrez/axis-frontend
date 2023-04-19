import useUser from "../../hooks/useUser";
import { ActionButton } from "../shared";

const Row = ({ role, onEdit, onDelete }) => {
  const { user: me } = useUser();

  return (
    <tr>
      <td>{role.name}</td>
      <td className="action-cell">
        <ActionButton
          label="Edit"
          className="primary"
          disable={me.role !== 1}
          onClick={() => onEdit(role)}
        />
      </td>
      <td className="action-cell">
        <ActionButton
          label="Delete"
          className="secondary"
          disable={me.role !== 1}
          onClick={() => onDelete(role)}
        />
      </td>
    </tr>
  );
};

export const Roles = ({ roles, onEdit, onDelete }) => {
  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <Row role={role} key={role.id} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};
