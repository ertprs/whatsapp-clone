import { Dispatch } from "redux";
import { actionTypes } from "redux-form";
import { axios } from "../../Axios";
import { User } from "../../interfaces/User";
import { ActionTypes } from "./types";

export interface FetchUserAction {
  type: ActionTypes.fetchUsers;
  payload: User[];
}

export const fetchUsers = () => async (dispatch: Dispatch) => {
  const res = await axios.get<User[]>("/api/all/contacts");
  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUsers,
    payload: res.data
  });
};
