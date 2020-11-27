import { Dispatch } from "redux";
import { axios } from "../../Axios";
import { Group } from "../../interfaces/Group";
import { GroupMsg } from "../../interfaces/GroupMsg";
import { Message } from "../../interfaces/Message";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/User";
import { io } from "../../pages";
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
  type:
    | ActionTypes.fetchGroupMessages
    | ActionTypes.groupMessagesLoadingStart
    | ActionTypes.groupMessagesLoadingStop;
  payload: GroupMsg[] | [];
}

export const fetchGroupMessages = (groupId: string) => async (
  dispatch: Dispatch,
  getstate: () => Redux
) => {
  try {
    getstate().group.groupMessages = null;
    dispatch({ type: ActionTypes.groupMessagesLoadingStart });
    const res = await axios.get<FetchGroupMessages["payload"]>(
      `/api/group/messages/${groupId}`
    );
    dispatch({ type: ActionTypes.groupMessagesLoadingStop });
    dispatch<FetchGroupMessages>({
      type: ActionTypes.fetchGroupMessages,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: ActionTypes.groupMessagesLoadingStop });
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

export interface SetGroupChat {
  type: ActionTypes.setGroupChat;
  payload: boolean;
}

export const setGroupChat = (set: boolean): SetGroupChat => {
  return {
    type: ActionTypes.setGroupChat,
    payload: set
  };
};

export interface AddCurrentGroup {
  type: ActionTypes.addCurrentGroup;
  payload: Group;
}

export const addCurrentGroup = (grp: Group): AddCurrentGroup => {
  return {
    type: ActionTypes.addCurrentGroup,
    payload: grp
  };
};

export interface SetSelectGroupMessages {
  type: ActionTypes.setSelectGroupMessages;
  payload: boolean;
}

export const setSelectGroupMessages = (
  set: boolean
): SetSelectGroupMessages => {
  return {
    type: ActionTypes.setSelectGroupMessages,
    payload: set
  };
};

export interface SetGroupDisplay {
  type: ActionTypes.setGroupDisplay;
  payload: boolean;
}

export const setGroupDisplay = (set: boolean): SetGroupDisplay => {
  return {
    type: ActionTypes.setGroupDisplay,
    payload: set
  };
};

export interface UpdateGroupRead {
  type: ActionTypes.updateGroupRead;
  payload: GroupMsg[];
}

export const updateGroupRead = (data: {
  messageIds: string[];
  readBy: string;
}) => async (dispatch: Dispatch) => {
  try {
    await axios.post("/api/update/group/messages/read", data);
    io.on("groupread", (data: { action: "change"; groupMsgs: GroupMsg[] }) => {
      if (data.action === "change") {
        dispatch<UpdateGroupRead>({
          type: ActionTypes.updateGroupRead,
          payload: data.groupMsgs
        });
      }
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export interface SetGroupSearch {
  type: ActionTypes.setGroupSearch;
  payload: boolean;
}

export const setGroupSearch = (set: boolean): SetGroupSearch => {
  return {
    type: ActionTypes.setGroupSearch,
    payload: set
  };
};
