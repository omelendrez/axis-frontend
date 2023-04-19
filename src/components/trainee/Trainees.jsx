import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { ActionButton, Search } from "../shared";
import { formatShortDate } from "../../helpers";

const Row = ({ trainee, onEdit, onDelete }) => {
  const { user } = useUser();
  return (
    <tr>
      <td>{trainee.badge}</td>
      <td>
        {trainee.last_name}, {trainee.first_name}
      </td>
      <td>{formatShortDate(trainee.birth_date)}</td>
      <td>{trainee.company_name}</td>
      <td>{trainee.nationality_name}</td>
      <td className="action-cell">
        <ActionButton
          label="Edit"
          className="primary"
          disabled={user.role !== 1}
          onClick={() => onEdit(trainee)}
        />
      </td>
      {user.role === 1 && (
        <td className="action-cell">
          <ActionButton
            label="Delete"
            className="secondary"
            disabled={user.role !== 1}
            onClick={() => onDelete(trainee)}
          />
        </td>
      )}
    </tr>
  );
};

export const Trainees = ({
  loadTrainees,
  trainees,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const [search, setSearch] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loadTrainees(search);
    }
  };

  return (
    <main className="container-fluid">
      <Search
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <figure>
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">Badge</th>
              <th scope="col">Name</th>
              <th scope="col">Birth date</th>
              <th scope="col">Company</th>
              <th scope="col">Nationality</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!isLoading && trainees.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <article>No records found</article>
                </td>
              </tr>
            )}

            {trainees.map((trainee) => (
              <Row
                trainee={trainee}
                key={trainee.id}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </figure>
    </main>
  );
};
