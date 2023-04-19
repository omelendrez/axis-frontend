import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { ActionButton, Search } from "../shared";

const Row = ({ user, onEdit, onDelete }) => {
  const { user: me } = useUser();

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.full_name}</td>
      <td>{user.email}</td>
      <td>{user.role_name}</td>
      <td className="action-cell">
        <ActionButton
          label="Edit"
          // disable={me.role !== 1}
          onEdit={() => {
            onEdit(user);
          }}
        />
      </td>
      {me.role === 1 && (
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

export const Users = ({ loadUsers, users, onEdit, onDelete, isLoading }) => {
  const [search, setSearch] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loadUsers(search);
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
              <th scope="col">Full name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && users.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <article>No records found</article>
                </td>
              </tr>
            )}

            {users.map((user) => (
              <Row
                user={user}
                key={user.id}
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
