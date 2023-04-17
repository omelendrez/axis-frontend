import useUser from "../../hooks/useUser";

const Row = ({ user, onEdit, onDelete }) => {
  const { user: me } = useUser();
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.full_name}</td>
      <td>{user.role_name}</td>
      <td>{user.status_name}</td>
      <td>
        <button
          type="button"
          onClick={() => onEdit(user)}
          disabled={user.id === 1 || (user.role == 1 && user.id !== me.id)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="error"
          disabled={user.status === 1 || user.role === 1}
          onClick={() => onDelete(user)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export const Users = ({ users, onEdit, onDelete }) => {
  return (
    <>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Full name</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Row
              user={user}
              key={user.id}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <center>{`${users.length} records found`}</center>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};
