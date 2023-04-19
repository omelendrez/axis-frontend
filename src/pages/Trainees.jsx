import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trainees as TraineesComponent,
  TableButtonRow,
  Loading,
} from "../components";
import { getTrainees, deleteTrainee } from "../services";
import useNoficication from "../hooks/useNotification";

export const Trainees = () => {
  const [trainees, setTrainees] = useState([]);
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

  const handleApiSuccess = (message) => {
    const notification = { type: "success", message };
    set(notification);
    setIsLoading(true);
    getTrainees()
      .then((res) => {
        setTrainees(res.data);
      })
      .catch((e) => {
        handleApiError(e);
      })
      .finally(() => {
        handleFinally();
      });
  };

  const handleEdit = (trainee) => {
    navigate(`/trainee/${trainee.id}`);
  };

  const handleDelete = (trainee) => {
    deleteTrainee(trainee.id)
      .then(() => {
        handleApiSuccess("Trainee deleted successfully");
      })
      .catch((e) => {
        handleApiError(e);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getTrainees()
      .then((res) => {
        setTrainees(res.data);
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
          <li>Trainees</li>
        </ul>
      </nav>
      <TableButtonRow url="/trainee" label="Add trainee" />

      <TraineesComponent
        trainees={trainees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </main>
  );
};
