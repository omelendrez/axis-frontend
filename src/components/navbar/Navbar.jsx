import { Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { SP } from "../../services";
import { UserContext, ThemeContext } from "../../context";
import { Divider } from "../shared";
import useUser from "../../hooks/useUser";

import "./navbar.css";

const LiElement = ({ route, path, label, icon, onClick }) => (
  <li className={route === `${path}` ? "active" : ""}>
    <Link to={path} onClick={onClick} className="link-option">
      <span className="material-icons">{icon}</span>
      {label}
    </Link>
  </li>
);

export const Navbar = () => {
  const { theme, toggle } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const { user: me } = useUser();

  const detailsRef = useRef(null);

  const handleClick = () => {
    detailsRef.current.removeAttribute("open");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const session = new SP();
    session.clear();
    setUser(null);
  };

  const appRoutes = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: "dashboard",
    },
  ];

  const userRoutes = [
    {
      label: user.name,
      icon: "person",
    },
    {
      path: "/change-password",
      label: "Change Password",
      icon: "key",
    },
    {
      label: "Logout",
      icon: "logout",
      onClick: handleLogout,
    },
  ];

  const location = useLocation();
  const route = location.pathname;

  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <details ref={detailsRef} role="list" dir="ltr">
            <summary aria-haspopup="listbox" role="link"></summary>
            <ul>
              {appRoutes
                .filter((r) => !r.role || r.role === user.role)
                .map((r) => (
                  <LiElement
                    route={route}
                    path={r.path}
                    icon={r.icon}
                    key={r.label}
                    label={r.label}
                    onClick={handleClick}
                  />
                ))}
              <Divider />
              {userRoutes.map((r) => (
                <LiElement
                  route={route}
                  path={r.path}
                  icon={r.icon}
                  key={r.label}
                  label={r.label}
                  onClick={r.label === "Logout" ? handleLogout : handleClick}
                />
              ))}
            </ul>
          </details>
        </li>
      </ul>
      <ul>
        <li>{me.full_name}</li>
      </ul>
      <ul>
        <li>
          <label htmlFor="theme">
            <span className="material-icons">
              {theme === "dark" ? "sunny" : "bedtime"}
              <input
                type="checkbox"
                id="theme"
                role="switch"
                onChange={toggle}
              ></input>
            </span>
          </label>
        </li>
      </ul>
    </nav>
  );
};
