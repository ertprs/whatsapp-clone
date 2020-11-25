import { Dispatch } from "redux";
import { axios } from "../../Axios";
import { Message } from "../../interfaces/Message";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { ActionTypes } from "./types";

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
  const showContactInfo = getState().user.showContactInfo;
  if (showContactInfo) {
    getState().user.showContactInfo = false;
  }
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
  payload:
    | Message
    | {
        message: string | null;
        to: User;
        from: User;
        createdAt: string;
      };
  currentContact: User | null;
  currentUser: User | null;
}

export const addNewMessage = (
  message:
    | Message
    | {
        message: string | null;
        to: User;
        from: User;
        createdAt: string;
      }
) => (dispatch: Dispatch, getState: () => Redux) => {
  dispatch<AddNewMessage>({
    type: ActionTypes.addNewMessage,
    payload: message,
    currentContact: getState().user.currentContact,
    currentUser: getState().user.currentUser
  });
};

export interface UpdateLastMsg {
  type: ActionTypes.updateLastMsg;
  payload: Message;
}

export const updateLastMsg = (message: Message): UpdateLastMsg => {
  return {
    type: ActionTypes.updateLastMsg,
    payload: message
  };
};
