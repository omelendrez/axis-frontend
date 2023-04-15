import { Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { SP } from '../../services';
import { UserContext } from "../../context";
import { Divider } from "../shared";
import './navbar.css';

const LiElement = ({ route, path, label, onClick }) => (
  <li className={route === `${path}` ? 'active' : ''}>
    <Link to={path} onClick={onClick}>
      {label}
    </Link>
  </li>
);


export const Navbar = () => {
  const detailsRef = useRef(null);
  const { user, setUser } = useContext(UserContext);

  const handleClick = () => {
    detailsRef.current.removeAttribute('open');
  };

  const routes = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/dashboard',
      label: 'Dashboard'
    }
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    const session = new SP();
    session.clear();
    setUser(null);
  };

  const location = useLocation();
  const route = location.pathname;

  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <details ref={detailsRef} role="list" dir="ltr">
            <summary aria-haspopup="listbox" role="link"></summary>

            <ul>
              {routes.map((r) =>
                <LiElement
                  route={route}
                  path={r.path}
                  key={r.path}
                  label={r.label}
                  onClick={handleClick}
                />
              )}

              <Divider />

              <li className="user-info" onClick={handleLogout}>
                <div>{user.first_name}</div>
                <div className="logout-div" />
              </li>
            </ul>

          </details>
        </li>
      </ul>
      <ul>
        <li><strong>{routes.find((r) => r.path === route)?.label}</strong></li>
      </ul>
    </nav>
  );
};
