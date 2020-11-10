import { Channel } from "../../interfaces/Channel";
import { User } from "../../interfaces/User";
import { FetchCurrentUserAction } from "../../pages/_app";
import {
  AddContactAction,
  AddCurrentContact,
  FetchContactAction,
  FilterContact,
  UpdateOnline,
  UpdateUser
} from "../actions";
import { ActionTypes } from "../actions/types";

type Action =
  | FetchContactAction
  | AddContactAction
  | FetchCurrentUserAction
  | FilterContact
  | AddCurrentContact
  | UpdateUser
  | UpdateOnline;

export interface UserState {
  contacts: User[] | [] | null;
  currentUser: User | null;
  filteredContacts: User[] | null;
  currentContact: User | null;
  channels: Channel[] | [] | null;
}

const INITIAL_STATE: UserState = {
  contacts: null,
  currentUser: null,
  filteredContacts: null,
  currentContact: null,
  channels: null
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

    case ActionTypes.updateOnline:
      const contacts = [...state.contacts];
      const indx = contacts?.findIndex(
        c => c._id.toString() === action.payload._id.toString()
      );
      if (indx !== -1) {
        contacts[indx].online = action.payload.online;
      }
      const currentContact = state.currentContact;
      if (currentContact?._id.toString() === action.payload._id.toString()) {
        currentContact.online = action.payload.online;
      }
      return { ...state, contacts, currentContact };
    default:
      return state;
  }
};
