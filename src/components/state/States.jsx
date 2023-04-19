import { useState } from "react";
import useUser from "../../hooks/useUser";
import { ActionButton, Search } from "../shared";

const Row = ({ state, onEdit, onDelete }) => {
  const { user } = useUser();
  return (
    <tr>
      <td>{state.name}</td>
      <td className="action-cell">
        <ActionButton
          label="Edit"
          className="primary"
          disabled={user.role !== 1}
          onClick={() => onEdit(state)}
        />
      </td>
      {user.role === 1 && (
        <td className="action-cell">
          <ActionButton
            label="Delete"
            className="secondary"
            disabled={user.role !== 1}
            onClick={() => onDelete(state)}
          />
        </td>
      )}
    </tr>
  );
};

export const States = ({ loadStates, states, onEdit, onDelete, isLoading }) => {
  const [search, setSearch] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loadStates(search);
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
              <th scope="col">Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!isLoading && states.length === 0 && (
              <tr>
                <td colSpan={9}>
                  <article>No records found</article>
                </td>
              </tr>
            )}

            {states.map((state) => (
              <Row
                state={state}
                key={state.id}
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
