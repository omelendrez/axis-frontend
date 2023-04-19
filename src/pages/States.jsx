import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  States as StatesComponent,
  TableButtonRow,
  Loading,
} from "../components";

import useStates from "../hooks/useStates";
import useNoficication from "../hooks/useNotification";

export const States = () => {
  const { states, load: loadStates, remove: removeState } = useStates();
  const { data, isLoading, isSuccess, isError, error } = states;

  const navigate = useNavigate();
  const { set } = useNoficication();

  useEffect(() => {
    if (!data.length) {
      loadStates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

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

  const handleEdit = (state) => {
    navigate(`/state/${state.id}`);
  };

  const handleDelete = (state) => {
    removeState(state.id);
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
          <li>States</li>
        </ul>
      </nav>
      <TableButtonRow url="/state" label="Add state" />

      <StatesComponent
        states={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loadStates={loadStates}
      />
    </main>
  );
};
