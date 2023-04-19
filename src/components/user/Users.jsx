import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { ActionButton, PaginationButtons } from "../shared";
import { PAGE_SIZE } from "../../helpers";

const Row = ({ user, onEdit, onDelete }) => {
  const { user: me } = useUser();

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.full_name}</td>
      <td>{user.role_name}</td>
      <td className="action-cell">
        <ActionButton
          label="Edit"
          disable={me.role !== 1}
          onEdit={() => onEdit(user)}
        />
      </td>
      {user.role === 1 && (
        <td className="action-cell">
          <ActionButton
            label="Delete"
            className="secondary"
            disabled={user.role !== 1}
            onClick={() => onDelete(user)}
          />
        </td>
      )}
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
              <PaginationButtons
                onPrev={handlePrev}
                onNext={handleNext}
                curPage={curPage}
                lastPage={lastPage}
              />
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};
