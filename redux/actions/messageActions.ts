import { Dispatch } from "redux";
import { axios } from "../../Axios";
import { Message } from "../../interfaces/Message";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { io } from "../../pages";
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

export interface FilterRecentChats {
  type: ActionTypes.filterRecentChats;
  payload: string;
}

export const filterRecentChats = (text: string): FilterRecentChats => {
  return {
    type: ActionTypes.filterRecentChats,
    payload: text
  };
};

export interface UpdateRead {
  type: ActionTypes.updateRead;
  payload: Message[];
}

export const updateRead = (msgIds: string[]) => async (dispatch: Dispatch) => {
  await axios.post("/api/update/read", { msgIds });
  io.on("read", (data: { action: string; messages: Message[] }) => {
    if (data.action === "change") {
      dispatch<UpdateRead>({
        type: ActionTypes.updateRead,
        payload: data.messages
      });
    }
  });
};

export interface UpdateSecondTick {
  type: ActionTypes.updateSecondTick;
  payload: Message[];
}

export const updateSecondTick = (msgIds: string[]) => async (
  dispatch: Dispatch
) => {
  await axios.post("/api/update/second_tick", { msgIds });
  io.on("secondTick", (data: { action: string; messages: Message[] }) => {
    if (data.action === "change") {
      dispatch<UpdateSecondTick>({
        type: ActionTypes.updateSecondTick,
        payload: data.messages
      });
    }
  });
};

export interface SetDisplay {
  type: ActionTypes.setDisplay;
  payload: boolean;
}

export const setDisplay = (display: boolean): SetDisplay => {
  return {
    type: ActionTypes.setDisplay,
    payload: display
  };
};

export interface ToggleSearchMessage {
  type: ActionTypes.toggleSearchMessage;
  payload: boolean;
}

export const toggleSearchMessage = (toggle: boolean): ToggleSearchMessage => {
  return {
    type: ActionTypes.toggleSearchMessage,
    payload: toggle
  };
};

export interface ScrollMessage {
  type: ActionTypes.scrollMessage;
  payload: Message;
}

export const setScrollMessage = (msg: Message): ScrollMessage => {
  return {
    type: ActionTypes.scrollMessage,
    payload: msg
  };
};

export interface SetShowMessageInfo {
  type: ActionTypes.setShowMessageInfo;
  payload: Message | null;
}

export const setShowMessageInfo = (msg: Message | null): SetShowMessageInfo => {
  return {
    type: ActionTypes.setShowMessageInfo,
    payload: msg
  };
};
