import { Dispatch } from "redux";
import { actionTypes } from "redux-form";
import { axios } from "../../Axios";
import { User } from "../../interfaces/User";
import { ActionTypes } from "./types";

export interface FetchContactAction {
  type: ActionTypes.fetchContacts;
  payload: User[];
}

export const fetchContacts = () => async (dispatch: Dispatch) => {
  const res = await axios.get<User[]>("/api/all/contacts");
  dispatch<FetchContactAction>({
    type: ActionTypes.fetchContacts,
    payload: res.data
  });
};

export interface AddContactAction {
  type: ActionTypes.addContact;
  payload: User;
}

export const addContact = (user: User) => {
  return {
    type: ActionTypes.addContact,
    payload: user
  };
};
