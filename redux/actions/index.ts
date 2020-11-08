import { Dispatch } from "redux";
import { actionTypes } from "redux-form";
import { axios } from "../../Axios";
import { Message } from "../../interfaces/Message";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { ActionTypes } from "./types";

export interface FetchContactAction {
  type: ActionTypes.fetchContacts;
  payload: User[];
}

export interface AddContactAction {
  type: ActionTypes.addContact;
  payload: User;
}

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

export interface FetchMessages {
  type:
    | ActionTypes.fetchMessages
    | ActionTypes.messagesLoadingStart
    | ActionTypes.messagesLoadingStop;
  payload?: Message[] | [];
}

export const fetchMessages = (contactId: string) => async (
  dispatch: Dispatch,
  getState: () => Redux
) => {
  dispatch<FetchMessages>({ type: ActionTypes.messagesLoadingStart });
  getState().message.messages = null;
  const res = await axios.get<FetchMessages["payload"]>(
    `/api/messages/${contactId}`
  );
  dispatch<FetchMessages>({
    type: ActionTypes.fetchMessages,
    payload: res.data
  });
  dispatch<FetchMessages>({ type: ActionTypes.messagesLoadingStop });
};

export interface AddNewMessage {
  type: ActionTypes.addNewMessage;
  payload: Message;
}

export const addNewMessage = (message: Message): AddNewMessage => {
  return {
    type: ActionTypes.addNewMessage,
    payload: message
  };
};
