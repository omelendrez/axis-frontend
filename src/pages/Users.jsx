import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users as UsersComponent, TableButtonRow } from "../components";
import { getUsers, deleteUser } from "../services";
import useNoficication from "../hooks/useNotification";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { set } = useNoficication();

  const handleApiError = (e) => {
    const notification = {
      type: "error",
      message: e.response.data.message,
    };
    set(notification);
  };

  const handleEdit = (user) => {
    navigate(`/user/${user.id}`);
  };

  const handleDelete = (user) => {
    deleteUser(user.id)
      .then(() => {
        getUsers().then((res) => {
          setUsers(res.data);
        });
      })
      .catch((e) => {
        handleApiError(e);
      });
  };

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <main className="container-fluid">
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
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
