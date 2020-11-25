import { Dispatch } from "redux";
import { axios } from "../../Axios";
import { Group } from "../../interfaces/Group";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { Message } from "../../interfaces/Message";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { ActionTypes } from "./types";

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

export interface SetGroupInfo {
  type: ActionTypes.setGroupInfo;
  payload: boolean;
}

export const setGroupInfo = (set: boolean): SetGroupInfo => {
  return {
    type: ActionTypes.setGroupInfo,
    payload: set
  };
};
