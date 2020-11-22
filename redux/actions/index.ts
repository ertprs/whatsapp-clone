import { Dispatch } from "redux";
import { actionTypes } from "redux-form";
import { axios } from "../../Axios";
import { Message } from "../../interfaces/Message";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { io } from "../../pages";
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

export interface UpdateUser {
  type: ActionTypes.updateUser;
  payload?: User;
}

export const updateUser = (userAttr: User | any) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await axios.post<User>("/api/update/user", userAttr);
    dispatch<UpdateUser>({ type: ActionTypes.updateUser, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
export interface UpdateUserProfile {
  type:
    | ActionTypes.updateUser
    | ActionTypes.userLoadingStart
    | ActionTypes.userLoadingStop;
  payload?: User;
}
export const updateUserProfile = (userAttr: User | any) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<UpdateUserProfile>({ type: ActionTypes.userLoadingStart });
    const res = await axios.post<User>("/api/update/user/profile", userAttr);
    dispatch<UpdateUserProfile>({
      type: ActionTypes.updateUser,
      payload: res.data
    });
    dispatch<UpdateUserProfile>({ type: ActionTypes.userLoadingStop });
  } catch (error) {
    dispatch<UpdateUserProfile>({ type: ActionTypes.userLoadingStop });
    console.log(error);
  }
};

export interface UpdateOnline {
  type: ActionTypes.updateOnline;
  payload: User;
}

export const updateOnline = (user: User): UpdateOnline => {
  return {
    type: ActionTypes.updateOnline,
    payload: user
  };
};

export interface UpdateTyping {
  type: ActionTypes.updateTyping;
  payload: User;
}

export const updateTyping = (user: User): UpdateTyping => {
  return {
    type: ActionTypes.updateTyping,
    payload: user
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

export interface ToggleProfile {
  type: ActionTypes.toggleProfile;
  payload: boolean;
}

export const toggleProfile = (toggle: boolean): ToggleProfile => {
  return {
    type: ActionTypes.toggleProfile,
    payload: toggle
  };
};

export interface ToggleContactInfo {
  type: ActionTypes.toggleContactInfo;
  payload: boolean;
}

export const toggleContactInfo = (toggle: boolean): ToggleContactInfo => {
  return {
    type: ActionTypes.toggleContactInfo,
    payload: toggle
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

export interface SetNewGroup {
  type: ActionTypes.setNewGroup;
  payload: boolean;
}

export const setNewGroup = (set: boolean): SetNewGroup => {
  return {
    type: ActionTypes.setNewGroup,
    payload: set
  };
};
