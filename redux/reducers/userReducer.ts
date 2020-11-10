import { User } from "../../interfaces/User";
import { FetchCurrentUserAction } from "../../pages/_app";
import {
  AddContactAction,
  AddCurrentContact,
  FetchContactAction,
  FilterContact,
  UpdateUser
} from "../actions";
import { ActionTypes } from "../actions/types";

type Action =
  | FetchContactAction
  | AddContactAction
  | FetchCurrentUserAction
  | FilterContact
  | AddCurrentContact
  | UpdateUser;

export interface UserState {
  contacts: User[] | [] | null;
  currentUser: User | null;
  filteredContacts: User[] | null;
  currentContact: User | null;
}

const INITIAL_STATE: UserState = {
  contacts: null,
  currentUser: null,
  filteredContacts: null,
  currentContact: null
};

export const userReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchContacts:
      return {
        ...state,
        contacts: action.payload,
        filteredContacts: action.payload
      };
    case ActionTypes.addContact:
      const isFound = state.contacts?.find(
        cont => cont._id.toString() === action.payload._id.toString()
      );
      if (isFound) {
        return {
          ...state,
          contacts: [...state.contacts],
          filteredContacts: [...state.contacts]
        };
      }
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        filteredContacts: [action.payload, ...state.contacts]
      };
    case ActionTypes.fetchCurrentUser:
      return { ...state, currentUser: action.payload };
    case ActionTypes.filterContacts:
      const filter = state.contacts?.filter(cont => {
        const name = `${cont.firstName}${cont.lastName}`;

        return name.toLowerCase().includes(action.payload.toLowerCase());
      });
      return { ...state, filteredContacts: filter };
    case ActionTypes.addCurrentContact:
      return { ...state, currentContact: action.payload };
    case ActionTypes.updateUser:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
