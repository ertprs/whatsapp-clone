import { Dispatch } from "redux";
import { axios } from "../../Axios";
import { Message } from "../../interfaces/Message";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { io } from "../../pages";
import { FetchCurrentUserAction } from "../../pages/_app";
import Router from "next/router";
import { ActionTypes } from "./types";
import { Group } from "../../interfaces/Group";
import { GroupMsg } from "../../interfaces/GroupMsg";

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

export interface SetGroupSubject {
  type: ActionTypes.setGroupSubject;
  payload: boolean;
}

export const setGroupSubject = (set: boolean): SetGroupSubject => {
  return {
    type: ActionTypes.setGroupSubject,
    payload: set
  };
};

export interface AddGroup {
  type: ActionTypes.addGroup;
  payload: Group;
}

export const addGroup = (group: Group): AddGroup => {
  return {
    type: ActionTypes.addGroup,
    payload: group
  };
};

export interface SetGroupContainer {
  type: ActionTypes.setGroupContainer;
  payload: boolean;
}

export const setGroupContainer = (set: boolean): SetGroupContainer => {
  return {
    type: ActionTypes.setGroupContainer,
    payload: set
  };
};

export interface SetSelectedContacts {
  type: ActionTypes.setSelectedContacts;
  payload: User[] | [];
}

export const setSelectedContacts = (ctx: User[] | []): SetSelectedContacts => {
  return {
    type: ActionTypes.setSelectedContacts,
    payload: ctx
  };
};

export interface SetNewChat {
  type: ActionTypes.setNewChat;
  payload: boolean;
}

export const setNewChat = (set: boolean): SetNewChat => {
  return {
    type: ActionTypes.setNewChat,
    payload: set
  };
};

export interface FetchGroupMessages {
  type: ActionTypes.fetchGroupMessages;
  payload: GroupMsg[] | [];
}

export const fetchGroupMessages = (groupId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await axios.get<FetchGroupMessages["payload"]>(
      `/api/group/messages/${groupId}`
    );
    dispatch<FetchGroupMessages>({
      type: ActionTypes.fetchGroupMessages,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
  }
};

export interface AddGroupMessage {
  type: ActionTypes.addGroupMessage;
  payload: GroupMsg;
}

export const addGroupMessage = (msg: GroupMsg): AddGroupMessage => {
  return {
    type: ActionTypes.addGroupMessage,
    payload: msg
  };
};
