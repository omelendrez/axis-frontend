import { useSelector, useDispatch } from "react-redux";
import {
  addState,
  modifyState,
  loadStates,
  removeState,
} from "../reducers/state/stateSlice";

const useStates = () => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.states);

  const add = (payload) => dispatch(addState(payload));
  const modify = (id, payload) => dispatch(modifyState(id, payload));
  const load = (search) => dispatch(loadStates(search));
  const remove = (id) => dispatch(removeState(id));

  return {
    add,
    modify,
    states,
    load,
    remove,
  };
};

export default useStates;
