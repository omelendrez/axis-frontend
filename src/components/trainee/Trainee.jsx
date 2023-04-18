import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputField,
  Confirm,
  FormButtonRow,
  Dropdown,
  SaveButton,
  CancelButton,
} from "../shared";
import { createTrainee, updateTrainee } from "../../services";
import useNoficication from "../../hooks/useNotification";
import statusList from "../../data/status.json";

const initialValues = {
  name: {
    value: "",
    error: "",
  },
  full_name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  role: {
    value: "",
    error: "",
  },
  status: {
    value: "",
    error: "",
  },
};

export const Trainee = ({ trainee }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [tempValue, setTempValue] = useState(null);
  const { set } = useNoficication();
  const isMounted = useRef(true);
  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    if (trainee) {
      Object.entries(trainee).map((f) => {
        const [id, value] = f;
        const data = { value, error: "" };
        setValues((values) => ({ ...values, [id]: data }));
      });
    }
  }, [trainee]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "status") {
      setTempValue({ id, value, prev: trainee.status });
      setConfirmMessage("Are you sure you want to change trainee status?");
      return setIsConfirmOpen(true);
    }
    const data = { value, error: "" };
    setValues((values) => ({ ...values, [id]: data }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const { id, value } = tempValue;
    const data = { value, error: "" };
    setValues((values) => ({ ...values, [id]: data }));
    setIsConfirmOpen(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    const { id, prev } = tempValue;
    const value = prev;
    const data = { value, error: "" };
    setValues((values) => ({ ...values, [id]: data }));

    setTempValue(null);
    setIsConfirmOpen(false);
  };

  const handleApiSuccess = (message) => {
    isMounted.current = false;
    const notification = { type: "success", message };
    set(notification);
    navigate("/trainees");
  };

  const handleApiError = (e) => {
    const message =
      e.code === "ERR_BAD_REQUEST"
        ? "Some fields have wrong information. Please double-check and try again."
        : e.message;
    const notification = {
      type: "error",
      message,
    };
    set(notification);
  };

  const handleFinally = () => {
    if (isMounted.current) {
      setIsSubmitting(false);
    }
  };

  const create = (payload) => {
    createTrainee(payload)
      .then((res) => {
        handleApiSuccess("Trainee added successfully!");
      })
      .catch((e) => {
        handleApiError(e);
      })
      .finally(() => {
        handleFinally();
      });
  };

  const update = (id, payload) => {
    updateTrainee(trainee.id, payload)
      .then((res) => {
        handleApiSuccess("Trainee saved successfully");
      })
      .catch((e) => {
        handleApiError(e);
      })
      .finally(() => {
        handleFinally();
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = Object.entries(values)
      .filter((id) => id !== "id")
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {});

    if (trainee?.id) {
      update(trainee.id, payload);
    } else {
      create(payload);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    formRef.current.submit();
  };

  const handleFormCancel = (e) => {
    e.preventDefault();
    navigate("/trainees");
  };

  const { name, full_name, email, role } = values;

  return (
    <>
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />

      <form onSubmit={handleFormSubmit} ref={formRef}>
        <InputField
          type="traineename"
          id="name"
          label="Traineename"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
          required
          autoCapitalize="off"
        />

        <InputField
          type="text"
          id="full_name"
          label="Full name"
          placeholder="Enter full name"
          value={full_name}
          onChange={handleChange}
          required
        />

        <InputField
          type="email"
          id="email"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
          required
          autoCapitalize="off"
        />

        <InputField
          type="text"
          id="role"
          label="Role"
          placeholder="Enter role"
          value={role}
          onChange={handleChange}
          required
        />

        <Dropdown
          onChange={handleChange}
          value={values.status.value}
          options={statusList}
        />

        <FormButtonRow>
          <SaveButton isSubmitting={isSubmitting} onSave={handleSave} />

          <CancelButton
            isSubmitting={isSubmitting}
            onCancel={handleFormCancel}
          />
        </FormButtonRow>
      </form>
    </>
  );
};
