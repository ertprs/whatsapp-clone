import { NextPageContext } from "next";
import React, { useEffect } from "react";
import { axios } from "../Axios";
import Chat from "../components/Chat";
import Contacts from "../components/Contacts";
import { withAuth } from "../HOCs/withAuth";
import { User } from "../interfaces/User";
import styles from "../styles/main.module.css";
import Error from "next/error";
import { ContactsContext } from "../Context/contactsContext";
import { Message } from "../interfaces/Message";
import { MessagesContext } from "../Context/messagesContext";
import openSocket from "socket.io-client";
import {
  addContact,
  AddNewMessage,
  addNewMessage,
  updateLastMsg,
  UpdateLastMsg,
  UpdateOnline,
  updateUser,
  updateOnline,
  UpdateTyping,
  updateTyping,
  addGroup,
  AddGroup,
  addGroupMessage,
  AddGroupMessage
} from "../redux/actions";
import { connect, useSelector } from "react-redux";
import { ActionTypes } from "../redux/actions/types";
import WithoutChat from "../components/WithoutChat";
import { Redux } from "../interfaces/Redux";
import { useBeforeunload } from "react-beforeunload";
import ContactInfo from "../components/ContactInfo";
import SearchMessage from "../components/SearchMessage";
import MessageInfo from "../components/MessageInfo";
import NewGroupContacts from "../components/Group/NewGroupContacts";
import { bindActionCreators } from "redux";
import GroupSubject from "../components/Group/GroupSubject";
import { Group } from "../interfaces/Group";
import GroupComponent from "../components/Group/Group";
import { GroupMsg } from "../interfaces/GroupMsg";
import GroupChat from "../components/Group/GroupChat";
import GroupInfo from "../components/Group/GroupInfo";
import GroupSearch from "../components/Group/GroupSearch";

export const io =
  process.env.NODE_ENV === "development"
    ? openSocket.io("http://localhost:3000")
    : openSocket.io("https://whatsapp-2.herokuapp.com");

interface Props {
  messages?: Message[] | [];
  statusCode?: number;
  addContact: Function;
  addNewMessage: (message: Message) => void;
  updateLastMsg: (message: Message) => UpdateLastMsg;
  contacts: User[] | [];
  updateUser: (user?: { [key: string]: any }) => void;
  updateOnline: (user: User) => UpdateOnline;
  updateTyping: (user: User) => UpdateTyping;
  addGroup: (grp: Group) => AddGroup;
  addGroupMessage: (msg: GroupMsg) => AddGroupMessage;
}

const index = (props: Props) => {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  const currentContact = useSelector<Redux>(
    state => state.user.currentContact
  ) as Redux["user"]["currentContact"];
  const currentUser = useSelector<Redux>(
    state => state.user.currentUser
  ) as Redux["user"]["currentUser"];
  const showContactInfo = useSelector<Redux>(
    state => state.user.showContactInfo
  ) as Redux["user"]["showContactInfo"];
  const groups = useSelector<Redux>(
    state => state.group.groups
  ) as Redux["group"]["groups"];
  const currentGroup = useSelector<Redux>(
    state => state.group.currentGroup
  ) as Redux["group"]["currentGroup"];
  const groupSearch = useSelector<Redux>(
    state => state.group.groupSearch
  ) as Redux["group"]["groupSearch"];
  const showMessageInfo = useSelector<Redux>(
    state => state.message.showMessageInfo
  ) as Redux["message"]["showMessageInfo"];

  useEffect(() => {
    io.on("contacts", (data: { action: string; contact: User }) => {
      if (data.action === "create") {
        props.addContact(data.contact);
      }
    });
    io.on(`message`, (data: { action: string; message: Message }) => {
      if (data.action === "create") {
        props.addNewMessage(data.message);
      }
    });
    io.on(`message`, (data: { action: string; message: Message }) => {
      if (data.action === "update") {
        if (
          data.message.to._id.toString() !== currentUser?._id.toString() &&
          data.message.from._id.toString() !== currentUser?._id.toString()
        ) {
          return;
        }
        props.updateLastMsg(data.message);
      }
    });
    // LISTEN FOR A NEW GROUP
    io.on("group", (data: { action: string; group: Group }) => {
      if (data.action === "create") {
        if (
          data.group.participants.find(
            pat => pat._id === currentUser?._id.toString()
          )
        ) {
          props.addGroup(data.group);
        }
      }
    });
    if (groups && groups.length !== 0) {
      (groups as Group[]).map(grp => {
        // LISTEN FOR GROUP MESSAGES
        io.on(`${grp._id}`, (data: { action: "create"; message: GroupMsg }) => {
          if (data.action === "create") {
            grp._id.toString() === data.message.group._id.toString() &&
              props.addGroupMessage(data.message);
          }
        });

        // UPDATE CURRENT GROUP MESSAGE
        io.on(`${grp._id}`, (data: { action: "update"; message: Group }) => {
          if (data.action === "update") {
            props.addGroup(data.message);
          }
        });
      });
    }

    io.on("active", (data: { action: string; user: User }) => {
      if (data.action === "change") {
        props.updateOnline(data.user);
      }
    });
    io.on("typing", (data: { action: string; user: User }) => {
      if (data.action === "change") {
        props.updateTyping(data.user);
      }
    });
  }, [currentContact ? currentContact._id : currentContact]);
  useEffect(() => {
    const user = {
      ...currentUser,
      online: true,
      updatedAt: new Date().toISOString()
    } as User;
    io.emit("active", { action: "change", user });
  }, []);
  if (typeof document !== "undefined") {
    useBeforeunload(e => {
      // update active state
      props.updateUser({ lastSeen: new Date() });
      const user = {
        ...currentUser,
        online: false,
        lastSeen: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as User;
      io.emit("active", { action: "change", user });
    });
    useEffect(() => {
      document.addEventListener("visibilitychange", () => {
        // update active state
        if (document.hidden) {
          props.updateUser({ lastSeen: new Date() });
          const user = {
            ...currentUser,
            online: false,
            lastSeen: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          } as User;
          io.emit("active", { action: "change", user });
        } else {
          const user = {
            ...currentUser,
            online: true,
            updatedAt: new Date().toISOString()
          } as User;
          io.emit("active", { action: "change", user });
        }
      });
      window.addEventListener("focus", () => {
        const user = {
          ...currentUser,
          online: true,
          updatedAt: new Date().toISOString()
        } as User;
        io.emit("active", { action: "change", user });
      });
      window.addEventListener("blur", () => {
        props.updateUser({ lastSeen: new Date() });
        const user = {
          ...currentUser,
          online: false,
          lastSeen: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as User;
        io.emit("active", { action: "change", user });
      });

      return () => {
        document.removeEventListener("visibilitychange", () => {
          // update active state
          if (document.hidden) {
            props.updateUser({ lastSeen: new Date() });
            const user = {
              ...currentUser,
              online: false,
              lastSeen: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } as User;
            io.emit("active", { action: "change", user });
          } else {
            const user = {
              ...currentUser,
              online: true,
              updatedAt: new Date().toISOString()
            } as User;
            io.emit("active", { action: "change", user });
          }
        });
        window.removeEventListener("blur", () => {
          props.updateUser({ lastSeen: new Date() });
          const user = {
            ...currentUser,
            online: false,
            lastSeen: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          } as User;
          io.emit("active", { action: "change", user });
        });
        window.removeEventListener("focus", () => {
          const user = {
            ...currentUser,
            online: true,
            updatedAt: new Date().toISOString()
          } as User;
          io.emit("active", { action: "change", user });
        });
      };
    }, [document.addEventListener, window.addEventListener]);
  }

  return (
    <div className={styles.container}>
      <ContactsContext.Provider value={{ contacts: props.contacts }}>
        <MessagesContext.Provider value={props.messages!}>
          <Contacts />
          <GroupComponent />
          <NewGroupContacts />
          <GroupSubject />
          {currentContact ? <Chat /> : <WithoutChat />}
          {currentGroup && <GroupChat />}
          {groupSearch && <GroupSearch />}
          <GroupInfo />
          {showContactInfo && <ContactInfo />}
          <SearchMessage />
          {showMessageInfo && <MessageInfo />}
        </MessagesContext.Provider>
      </ContactsContext.Provider>
    </div>
  );
};

export interface FetchLastMsg {
  type: ActionTypes.fetchLastMsg;
  payload: Message[] | [];
}
export interface FetchAllGroups {
  type: ActionTypes.fetchAllGroups;
  payload: Group[] | [];
}

index.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const lastMsgs = await axios.get<FetchLastMsg["payload"]>("/api/last/msg", {
      headers: ctx.req?.headers
    });
    ctx.store.dispatch<FetchLastMsg>({
      type: ActionTypes.fetchLastMsg,
      payload: lastMsgs.data
    });
    const res = await axios.get<User[]>("/api/all/contacts", {
      headers: ctx.req?.headers
    });
    ctx.store.dispatch({ type: ActionTypes.fetchContacts, payload: res.data });

    const grpres = await axios.get<FetchAllGroups["payload"]>(
      "/api/all/groups",
      { headers: ctx.req?.headers }
    );

    ctx.store.dispatch<FetchAllGroups>({
      type: ActionTypes.fetchAllGroups,
      payload: grpres.data
    });

    return {
      contacts: res.data
    };
  } catch (error) {
    return { statusCode: error.response.status };
  }
};

export default connect(null, dispatch =>
  bindActionCreators(
    {
      addContact,
      addNewMessage,
      updateLastMsg,
      updateUser,
      updateOnline,
      updateTyping,
      addGroup,
      addGroupMessage
    },
    dispatch
  )
)(withAuth(index));
