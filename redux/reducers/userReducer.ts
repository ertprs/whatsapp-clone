import { User } from "../../interfaces/User";
import { FetchCurrentUserAction } from "../../pages/_app";
import { AddContactAction, FetchContactAction } from "../actions";
import { ActionTypes } from "../actions/types";

type Action = FetchContactAction | AddContactAction | FetchCurrentUserAction;

export interface UserState {
  contacts: User[] | [] | null;
  currentUser: User | null;
}

const INITIAL_STATE: UserState = {
  contacts: null,
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchContacts:
      return { ...state, contacts: action.payload };
    case ActionTypes.addContact:
      const isFound = state.contacts?.find(
        cont => cont._id.toString() === action.payload._id.toString()
      );
      if (isFound) {
        return { ...state, contacts: [...state.contacts] };
      }
      return { ...state, contacts: [action.payload, ...state.contacts] };
    case ActionTypes.fetchCurrentUser:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
