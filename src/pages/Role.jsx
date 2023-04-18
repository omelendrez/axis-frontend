import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Role as RoleComponent } from "../components";
import { getRole } from "../services";

export const Role = () => {
  const params = useParams();
  const [Role, setRole] = useState(null);

  useEffect(() => {
    const id = params?.id;
    if (id) {
      getRole(id).then((res) => {
        setRole(res.data);
      });
    }
  }, [params]);

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
          <li>
            <Link to="/Roles">Roles</Link>
          </li>
          <li>Role</li>
        </ul>
      </nav>
      <RoleComponent Role={Role} />
    </main>
  );
};
