import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users as UsersComponent,
  TableButtonRow,
  Loading,
} from "../components";
import { deleteUser, getUsers } from "../services";
import useNoficication from "../hooks/useNotification";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { set } = useNoficication();
  const [isLoading, setIsLoading] = useState(false);

  const handleFinally = () => {
    setIsLoading(false);
  };

  const handleApiSuccess = (message) => {
    const notification = { type: "success", message };
    set(notification);
    setIsLoading(true);
    getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        handleApiError(e);
      })
      .finally(() => {
        handleFinally();
      });
  };

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
        handleApiSuccess("User deleted successfully");
      })
      .catch((e) => {
        handleApiError(e);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        handleApiError(e);
      })
      .finally(() => {
        handleFinally();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
};
