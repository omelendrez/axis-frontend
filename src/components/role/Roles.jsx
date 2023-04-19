import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { ActionButton, PaginationButtons } from "../shared";
import { PAGE_SIZE } from "../../helpers";

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
  const [pagedRoles, setPagedRoles] = useState([]);
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
    const rows = Array.from(roles).slice(curRow, curRow + PAGE_SIZE);

    const lastPage =
      Math.floor(roles.length / PAGE_SIZE) !== roles.length / PAGE_SIZE
        ? Math.floor(roles.length / PAGE_SIZE) + 1
        : roles.length / PAGE_SIZE;

    setPagedRoles(rows);
    setLastPage(lastPage);
  }, [curRow, roles]);

  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pagedRoles.map((role) => (
          <Row role={role} key={role.id} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
      {pagedRoles.length > 0 && (
        <tfoot>
          <tr>
            <td colSpan={2}>
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
