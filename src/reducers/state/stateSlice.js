import { createSlice } from "@reduxjs/toolkit";
import {
  createState,
  updateState,
  getStates,
  deleteState,
} from "../../services";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const userSlice = createSlice({
  name: "states",
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

export function loadStates(search) {
  const { setLoading, setSuccess, setError, reset } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await getStates(search);
      dispatch(setSuccess(data));
      setTimeout(() => {
        dispatch(reset());
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data));
    }
  };
}

export function removeState(id) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await deleteState(id);
      dispatch(loadStates());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}

export function addState(payload) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await createState(payload);
      dispatch(loadStates());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}

export function modifyState(id, payload) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await updateState(id, payload);
      dispatch(loadStates());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}
