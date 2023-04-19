import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users as UsersComponent,
  TableButtonRow,
  Loading,
} from "../components";
import useUsers from "../hooks/useUsers";
import useNoficication from "../hooks/useNotification";

export const Users = () => {
  const { users, load: loadUsers, remove: removeUser } = useUsers();
  const navigate = useNavigate();
  const { set } = useNoficication();
  const { data, isLoading, isSuccess, isError, error } = users;

  useEffect(() => {
    if (!data.length) {
      loadUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError) {
      const notification = {
        type: "error",
        message: error.message,
      };
      set(notification);
    }
    if (isSuccess) {
      const notification = {
        type: "success",
        message: "Operation completed successfully",
      };
      set(notification);
    }
  }, [isError, isSuccess]);

  const handleEdit = (user) => {
    navigate(`/user/${user.id}`);
  };

  const handleDelete = (user) => {
    removeUser(user.id);
  };

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Users</li>
        </ul>
      </nav>

      <TableButtonRow url="/user" label="Add user" />

      <UsersComponent
        users={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </main>
  );
};
