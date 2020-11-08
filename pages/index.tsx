import { NextPage, NextPageContext } from "next";
import React, { useEffect, useState } from "react";
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
  UpdateLastMsg
} from "../redux/actions";
import { connect, useSelector } from "react-redux";
import { ActionTypes } from "../redux/actions/types";
import WithoutChat from "../components/WithoutChat";
import { Redux } from "../interfaces/Redux";

export const io = openSocket.io("http://localhost:5000");

interface Props {
  messages?: Message[] | [];
  statusCode?: number;
  addContact: Function;
  addNewMessage: (message: Message) => AddNewMessage;
  updateLastMsg: (message: Message) => UpdateLastMsg;
}

const index = (props: Props) => {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  const [contacts, setContacts] = useState<User[] | [] | null>(null);
  const currentContact = useSelector<Redux>(
    state => state.user.currentContact
  ) as Redux["user"]["currentContact"];

  useEffect(() => {
    io.on("contacts", (data: { action: string; contact: User }) => {
      if (data.action === "create") {
        props.addContact(data.contact);
      }
    });
    io.on("message", (data: { action: string; message: Message }) => {
      if (data.action === "create") {
        props.addNewMessage(data.message);
      }
    });
    io.on("message", (data: { action: string; message: Message }) => {
      if (data.action === "update") {
        props.updateLastMsg(data.message);
      }
    });
  }, []);
  return (
    <div className={styles.container}>
      <ContactsContext.Provider value={{ contacts: contacts, setContacts }}>
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
    return {
      contacts: res.data
    };
  } catch (error) {
    return { statusCode: error.response.status };
  }
};

export default connect(null, { addContact, addNewMessage, updateLastMsg })(
  withAuth(index)
);
