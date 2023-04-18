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
import { createUser, updateUser } from "../../services";
import useNoficication from "../../hooks/useNotification";
import { role as roleList, status as statusList } from "../../data";

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

export const User = ({ user }) => {
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
    if (user) {
      Object.entries(user).map((f) => {
        const [id, value] = f;
        const data = { value, error: "" };
        setValues((values) => ({ ...values, [id]: data }));
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "status") {
      setTempValue({ id, value, prev: user.status });
      setConfirmMessage("Are you sure you want to change user status?");
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
    navigate("/users");
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
    createUser(payload)
      .then((res) => {
        handleApiSuccess("User added successfully!");
      })
      .catch((e) => {
        handleApiError(e);
      })
      .finally(() => {
        handleFinally();
      });
  };

  const update = (id, payload) => {
    updateUser(user.id, payload)
      .then((res) => {
        handleApiSuccess("User saved successfully");
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

    if (user?.id) {
      update(user.id, payload);
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
    navigate("/users");
  };

  const { name, full_name, email, role, status } = values;

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
          type="username"
          id="name"
          label="Username"
          placeholder="Enter name"
          value={name.value}
          onChange={handleChange}
          required
          autoCapitalize="off"
        />

        <InputField
          type="text"
          id="full_name"
          label="Full name"
          placeholder="Enter full name"
          value={full_name.value}
          onChange={handleChange}
          required
        />

        <InputField
          type="email"
          id="email"
          label="Email"
          placeholder="Enter email"
          value={email.value}
          onChange={handleChange}
          required
          autoCapitalize="off"
        />

        <Dropdown
          id="role"
          label="Role"
          onChange={handleChange}
          value={role.value}
          options={roleList}
        />

        <Dropdown
          id="status"
          label="Status"
          onChange={handleChange}
          value={status.value}
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
