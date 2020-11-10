import { NextPage, NextPageContext } from "next";
import React, { useCallback, useEffect, useState } from "react";
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
  updateOnline
} from "../redux/actions";
import { connect, useSelector } from "react-redux";
import { ActionTypes } from "../redux/actions/types";
import WithoutChat from "../components/WithoutChat";
import { Redux } from "../interfaces/Redux";
import { Channel } from "../interfaces/Channel";

export const io = openSocket.io("http://localhost:5000");

interface Props {
  messages?: Message[] | [];
  statusCode?: number;
  addContact: Function;
  addNewMessage: (message: Message) => AddNewMessage;
  updateLastMsg: (message: Message) => UpdateLastMsg;
  contacts: User[] | [];
  updateUser: (user?: { [key: string]: any }) => void;
  updateOnline: (user: User) => UpdateOnline;
}

const index = (props: Props) => {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  const [active, setActive] = useState<boolean>(true);
  const currentContact = useSelector<Redux>(
    state => state.user.currentContact
  ) as Redux["user"]["currentContact"];
  const currentUser = useSelector<Redux>(
    state => state.user.currentUser
  ) as Redux["user"]["currentUser"];

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
    io.on("online", (data: { action: string; user: User }) => {
      if (data.action === "change") {
        props.updateOnline(data.user);
      }
    });
  }, [currentContact ? currentContact._id : currentContact]);

  if (typeof document !== "undefined") {
    useEffect(() => {
      document.addEventListener("visibilitychange", () => {
        setActive(prev => !prev);
      });
    }, [document.addEventListener]);
  }
  useEffect(() => {
    if (currentUser?.online !== active) {
      props.updateUser({ online: active });
    }
  }, [active]);

  return (
    <div className={styles.container}>
      <ContactsContext.Provider value={{ contacts: props.contacts }}>
        <MessagesContext.Provider value={props.messages!}>
          <Contacts />
          {currentContact ? <Chat /> : <WithoutChat />}
        </MessagesContext.Provider>
      </ContactsContext.Provider>
    </div>
  );
};

export interface FetchLastMsg {
  type: ActionTypes.fetchLastMsg;
  payload: Message[] | [];
}

export interface FetchChannels {
  type: ActionTypes.fetchChannels;
  payload: Channel[] | [];
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
    const channRes = await axios.get<FetchChannels["payload"]>(
      "/api/all/channels"
    );
    ctx.store.dispatch({ type: ActionTypes.fetchContacts, payload: res.data });
    ctx.store.dispatch({
      type: ActionTypes.fetchChannels,
      payload: channRes.data
    });
    return {
      contacts: res.data
    };
  } catch (error) {
    return { statusCode: error.response.status };
  }
};

export default connect(null, {
  addContact,
  addNewMessage,
  updateLastMsg,
  updateUser,
  updateOnline
})(withAuth(index));
