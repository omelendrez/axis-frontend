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

import {
  company as companyList,
  nationality as nationalityList,
  sex as sexList,
  state as stateList,
  status as statusList,
  type as typeList,
} from "../../data";

const initialValues = {
  type: {
    value: "",
    error: "",
  },
  badge: {
    value: "",
    error: "",
  },
  last_name: {
    value: "",
    error: "",
  },
  first_name: {
    value: "",
    error: "",
  },
  sex: {
    value: "",
    error: "",
  },
  state: {
    value: "",
    error: "",
  },
  nationality: {
    value: "",
    error: "",
  },
  birth_date: {
    value: "",
    error: "",
  },
  company: {
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
      setTempValue({ id, value, prev: trainee?.status });
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

  const {
    type,
    badge,
    last_name,
    first_name,
    sex,
    state,
    nationality,
    birth_date,
    company,
    status,
  } = values;

  return (
    <>
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />

      <form onSubmit={handleFormSubmit} ref={formRef}>
        <Dropdown
          id="type"
          onChange={handleChange}
          value={type.value}
          options={typeList}
        />

        <InputField
          type="text"
          id="badge"
          label="Badge"
          placeholder="Enter badge"
          value={badge}
          onChange={handleChange}
        />

        <InputField
          type="text"
          id="last_name"
          label="Last name"
          placeholder="Enter last name"
          value={last_name}
          onChange={handleChange}
          required
        />

        <InputField
          type="text"
          id="first_name"
          label="First name"
          placeholder="Enter first name"
          value={first_name}
          onChange={handleChange}
          required
        />

        <Dropdown
          id="sex"
          onChange={handleChange}
          value={sex.value}
          options={sexList}
        />

        <Dropdown
          id="state"
          onChange={handleChange}
          value={state.value}
          options={stateList}
        />

        <Dropdown
          id="nationality"
          onChange={handleChange}
          value={nationality.value}
          options={nationalityList}
        />

        <InputField
          type="date"
          id="birth_date"
          label="Birth date"
          placeholder="Enter birth date"
          value={birth_date}
          onChange={handleChange}
          required
        />

        <Dropdown
          id="company"
          onChange={handleChange}
          value={company.value}
          options={companyList}
        />

        <Dropdown
          id="status"
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
