import { createSlice } from "@reduxjs/toolkit";
import { createUser, updateUser, getUsers, deleteUser } from "../../services";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
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

export function loadUsers() {
  const { setLoading, setSuccess, setError, reset } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await getUsers();
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

export function removeUser(id) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await deleteUser(id);
      dispatch(loadUsers());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}

export function addUser(payload) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await createUser(payload);
      dispatch(loadUsers());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}

export function modifyUser(id, payload) {
  const { setLoading, setError } = userSlice.actions;

  return async (dispatch) => {
    dispatch(setLoading());
    try {
      await updateUser(id, payload);
      dispatch(loadUsers());
    } catch (error) {
      dispatch(setError(error.response.data));
    }
  };
}
