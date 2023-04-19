import { useSelector, useDispatch } from "react-redux";
import {
  addTrainee,
  modifyTrainee,
  loadTrainees,
  removeTrainee,
} from "../reducers/trainee/traineeSlice";

const useTrainees = () => {
  const dispatch = useDispatch();
  const trainees = useSelector((state) => state.trainees);

  const add = (payload) => dispatch(addTrainee(payload));
  const modify = (id, payload) => dispatch(modifyTrainee(id, payload));
  const load = (search) => dispatch(loadTrainees(search));
  const remove = (id) => dispatch(removeTrainee(id));

  return {
    add,
    modify,
    trainees,
    load,
    remove,
  };
};

export default useTrainees;
