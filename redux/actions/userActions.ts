import { axios } from "../../Axios";
import { User } from "../../interfaces/User";
import { FetchCurrentUserAction } from "../../pages/_app";
import { ActionTypes } from "./types";
import Router from "next/router";
import { Dispatch } from "redux";

export interface FetchContactAction {
  type: ActionTypes.fetchContacts;
  payload: User[];
}

export interface AddContactAction {
  type: ActionTypes.addContact;
  payload: User;
}

export const fetchCurrentUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<{ currentUser: User | null }>(
      "/api/currentUser"
    );
    dispatch<FetchCurrentUserAction>({
      type: ActionTypes.fetchCurrentUser,
      payload: res.data.currentUser
    });
    Router.push("/");
  } catch (error) {
    console.log(error.response);
  }
};

export const addContact = (user: User): AddContactAction => {
  return {
    type: ActionTypes.addContact,
    payload: user
  };
};

export interface FilterContact {
  type: ActionTypes.filterContacts;
  payload: string;
}

export const filterContact = (text: string): FilterContact => {
  return {
    type: ActionTypes.filterContacts,
    payload: text
  };
};

export interface AddCurrentContact {
  type: ActionTypes.addCurrentContact;
  payload: User;
}

export const addCurrentContact = (user: User): AddCurrentContact => {
  return {
    type: ActionTypes.addCurrentContact,
    payload: user
  };
};
