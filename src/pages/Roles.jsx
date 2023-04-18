import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Roles as RolesComponent,
  TableButtonRow,
  Loading,
} from "../components";
import { getRoles } from "../services";
import useNoficication from "../hooks/useNotification";

export const Roles = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const { set } = useNoficication();
  const [isLoading, setIsLoading] = useState(false);

  const handleApiError = (e) => {
    const notification = {
      type: "error",
      message: e.response.data.message,
    };
    set(notification);
  };

  const handleFinally = () => {
    setIsLoading(false);
  };

  const handleEdit = (role) => {
    navigate(`/role/${role.id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    getRoles()
      .then((res) => {
        setRoles(res.data);
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
          <li>Roles</li>
        </ul>
      </nav>
      <TableButtonRow url="/role" label="Add role" />

      <RolesComponent roles={roles} onEdit={handleEdit} />
    </main>
  );
};
