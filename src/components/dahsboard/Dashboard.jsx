import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import "./dashboard.css";

const menuOptions = [
  {
    title: "Users",
    description: "Manage Axis users",
    path: "/users",
    role: 1,
  },
  {
    title: "Roles",
    description: "Manage user roles",
    path: "/roles",
    role: 1,
  },
  {
    title: "States",
    description: "Manage states master table",
    path: "/state",
    role: 1,
  },
  {
    title: "Nationalities",
    description: "Manage nationalities master table",
    path: "/nationality",
    role: 1,
  },
  {
    title: "Companies",
    description: "Manage companies master table",
    path: "/company",
    role: 1,
  },
  {
    title: "Trainees",
    description: "Manage trainees",
    path: "/trainees",
    role: 1,
  },
  {
    title: "Courses",
    description: "Manage safety courses",
    path: "/course",
    role: 1,
  },
];

const MenuOption = ({ title, description, path }) => (
  <article>
    <hgroup>
      <Link to={path} role="button">
        Go
      </Link>
      <h2>{title}</h2>
      <h3>{description}</h3>
    </hgroup>
  </article>
);

export const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="container dashboard">
      {menuOptions
        .filter((r) => !r.role || r.role === user.role)
        .map((o) => (
          <MenuOption
            key={o.path}
            title={o.title}
            description={o.description}
            path={o.path}
          />
        ))}
    </main>
  );
};
