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

import useTrainees from "../../hooks/useTrainees";

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
  const { trainees, add, modify } = useTrainees();
  const { isLoading, isSuccess } = trainees;

  const [values, setValues] = useState(initialValues);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [tempValue, setTempValue] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    if (trainee) {
      Object.entries(trainee).forEach(([id, value]) => {
        const data = { value, error: "" };
        setValues((values) => ({ ...values, [id]: data }));
      });
    }
  }, [trainee]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/trainees");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = Object.entries(values)
      .filter((id) => id !== "id")
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {});

    if (trainee?.id) {
      modify(trainee.id, payload);
    } else {
      add(payload);
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
          label="Type"
          onChange={handleChange}
          value={type.value}
          options={typeList}
        />

        <InputField
          type="text"
          id="badge"
          label="Badge"
          placeholder="Enter badge"
          value={badge.value}
          onChange={handleChange}
        />

        <InputField
          type="text"
          id="last_name"
          label="Last name"
          placeholder="Enter last name"
          value={last_name.value}
          onChange={handleChange}
          required
        />

        <InputField
          type="text"
          id="first_name"
          label="First name"
          placeholder="Enter first name"
          value={first_name.value}
          onChange={handleChange}
          required
        />

        <Dropdown
          id="sex"
          label="Sex"
          onChange={handleChange}
          value={sex.value}
          options={sexList}
        />

        <Dropdown
          id="state"
          label="State"
          onChange={handleChange}
          value={state.value}
          options={stateList}
        />

        <Dropdown
          id="nationality"
          label="Nationality"
          onChange={handleChange}
          value={nationality.value}
          options={nationalityList}
        />

        <InputField
          type="date"
          id="birth_date"
          label="Birth date"
          placeholder="Enter birth date"
          value={birth_date.value}
          onChange={handleChange}
          required
        />

        <Dropdown
          id="company"
          label="Company"
          onChange={handleChange}
          value={company.value}
          options={companyList}
        />

        <Dropdown
          id="status"
          label="Status"
          onChange={handleChange}
          value={status.value}
          options={statusList}
        />

        <FormButtonRow>
          <SaveButton isSubmitting={isLoading} onSave={handleSave} />

          <CancelButton isSubmitting={isLoading} onCancel={handleFormCancel} />
        </FormButtonRow>
      </form>
    </>
  );
};
