import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trainees as TraineesComponent,
  TableButtonRow,
  Loading,
} from "../components";
import useUsers from "../hooks/useTrainees";
import useNoficication from "../hooks/useNotification";

export const Trainees = () => {
  const { trainees, load: loadTrainees, remove: removeTrainee } = useUsers();
  const { data, isLoading, isSuccess, isError, error } = trainees;

  const navigate = useNavigate();
  const { set } = useNoficication();

  useEffect(() => {
    if (!data.length) {
      loadTrainees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainees]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const handleEdit = (trainee) => {
    navigate(`/trainee/${trainee.id}`);
  };

  const handleDelete = (trainee) => {
    removeTrainee(trainee.id);
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
          <li>Trainees</li>
        </ul>
      </nav>

      <TableButtonRow url="/trainee" label="Add trainee" />

      <TraineesComponent
        trainees={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadTrainees={loadTrainees}
      />
    </main>
  );
};
