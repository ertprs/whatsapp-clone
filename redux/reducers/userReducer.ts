import { User } from "../../interfaces/User";
import { FetchCurrentUserAction } from "../../pages/_app";
import {
  AddContactAction,
  AddCurrentContact,
  FetchContactAction,
  FilterContact,
  FilterRecentChats,
  SetNewChat,
  ToggleContactInfo,
  ToggleProfile,
  UpdateOnline,
  UpdateTyping,
  UpdateUser,
  UpdateUserProfile
} from "../actions";
import { ActionTypes } from "../actions/types";

type Action =
  | FetchContactAction
  | AddContactAction
  | FetchCurrentUserAction
  | FilterContact
  | AddCurrentContact
  | UpdateUser
  | UpdateOnline
  | UpdateTyping
  | ToggleProfile
  | ToggleContactInfo
  | UpdateUserProfile
  | SetNewChat;

export interface UserState {
  contacts: User[] | [] | null;
  currentUser: User | null;
  filteredContacts: User[] | null;
  currentContact: User | null;
  showProfile: boolean;
  showContactInfo: boolean;
  userLoading: boolean;
  newChat: boolean;
}

const INITIAL_STATE: UserState = {
  contacts: null,
  currentUser: null,
  filteredContacts: null,
  currentContact: null,
  showProfile: false,
  showContactInfo: false,
  userLoading: false,
  newChat: false
};

export const userReducer = (
  state = INITIAL_STATE,
  action: Action
): UserState => {
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
        const name = `${cont.firstName.toLowerCase()}${cont.lastName.toLowerCase()}`;

        return name.toLowerCase().includes(action.payload.toLowerCase());
      }) as User[] | [];
      return { ...state, filteredContacts: filter };
    case ActionTypes.addCurrentContact:
      return { ...state, currentContact: action.payload };
    case ActionTypes.updateUser:
      return {
        ...state,
        currentUser: action.payload as UserState["currentUser"]
      };

    case ActionTypes.updateOnline:
      const contacts = [...state.contacts];
      const indx = contacts?.findIndex(
        c => c._id.toString() === action.payload._id.toString()
      );
      if (indx !== -1) {
        contacts[indx] = action.payload;
      }
      let currentContact = state.currentContact;
      if (currentContact?._id.toString() === action.payload._id.toString()) {
        currentContact = action.payload;
      }
      return { ...state, contacts, currentContact };
    case ActionTypes.updateTyping:
      if (
        state.currentContact?._id.toString() === action.payload._id.toString()
      ) {
        return { ...state, currentContact: action.payload };
      }
      return state;
    case ActionTypes.toggleProfile:
      return { ...state, showProfile: action.payload };
    case ActionTypes.toggleContactInfo:
      return { ...state, showContactInfo: action.payload };
    case ActionTypes.userLoadingStart:
      return { ...state, userLoading: true };
    case ActionTypes.userLoadingStop:
      return { ...state, userLoading: false };
    case ActionTypes.setNewChat:
      return { ...state, newChat: action.payload };

    default:
      return state;
  }
};
