import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { User as UserComponent } from "../components";
import { getUser } from "../services";

export const User = () => {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = params?.id;
    if (id) {
      getUser(id).then((res) => {
        setUser(res.data);
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
            <Link to="/users">Users</Link>
          </li>
          <li>User</li>
        </ul>
      </nav>
      <UserComponent user={user} />
    </main>
  );
};
