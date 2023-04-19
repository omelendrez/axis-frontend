import { createSlice } from "@reduxjs/toolkit";
import {
  getTrainees,
  deleteTrainee,
  createTrainee,
  updateTrainee,
} from "../../services";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const userSlice = createSlice({
  name: "trainees",
  initialState: initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    },
    setSuccess(state, action) {
      state.data = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
    },
    setError(state, action) {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    reset(state) {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export default userSlice.reducer;

export function loadTrainees(search) {
  const { setLoading, setSuccess, setError, reset } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await getTrainees(search);
      dispatch(setSuccess(data));
      setTimeout(() => {
        dispatch(reset());
      }, 1000);
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}

export function removeTrainee(id) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await deleteTrainee(id);
      dispatch(loadTrainees());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}

export function addTrainee(payload) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await createTrainee(payload);
      dispatch(loadTrainees());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}

export function modifyTrainee(id, payload) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await updateTrainee(id, payload);
      dispatch(loadTrainees());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}
