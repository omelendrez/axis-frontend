import { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import { FormButtonRow } from "../shared";
import { PAGE_SIZE } from "../../helpers";

const Row = ({ user, onEdit, onDelete }) => {
  const { user: me } = useUser();

  return (
    <tr>
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
  const [pagedUsers, setPagedUsers] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [curRow, setCurRow] = useState(0);

  const handlePrev = (e) => {
    e.preventDefault();
    setCurRow((r) => r - PAGE_SIZE);
    setCurPage((p) => p - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurRow((r) => r + PAGE_SIZE);
    setCurPage((p) => p + 1);
  };

  useEffect(() => {
    const rows = Array.from(users).slice(curRow, curRow + PAGE_SIZE);

    const lastPage =
      Math.floor(users.length / PAGE_SIZE) !== users.length / PAGE_SIZE
        ? Math.floor(users.length / PAGE_SIZE) + 1
        : users.length / PAGE_SIZE;

    setPagedUsers(rows);
    setLastPage(lastPage);
  }, [curRow, users]);

  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Full name</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pagedUsers.map((user) => (
          <Row user={user} key={user.id} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
      {pagedUsers.length > 0 && (
        <tfoot>
          <tr>
            <td colSpan={9}>
              <FormButtonRow>
                <a
                  href="#"
                  role="button"
                  onClick={handlePrev}
                  disabled={curPage === 1}
                >
                  <span className="material-icons">arrow_back</span>
                </a>
                <center>{`Page ${curPage} of ${lastPage} `}</center>
                <a
                  href="#"
                  role="button"
                  onClick={handleNext}
                  disabled={curPage === lastPage}
                >
                  <span className="material-icons">arrow_forward_ios</span>
                </a>
              </FormButtonRow>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};
