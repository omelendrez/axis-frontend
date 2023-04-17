import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { Home as HomeComponent } from "../components";

export const Home = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!user?.id) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="container-fluid">
      <HomeComponent loading={loading} />
    </main>
  );
};
