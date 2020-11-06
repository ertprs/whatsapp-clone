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

interface Props {
  contacts?: User[] | [];
  messages?: Message[] | [];
  statusCode?: number;
}

const index = (props: Props) => {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  const [contacts, setContacts] = useState<User[] | [] | null>(null);
  useEffect(() => {
    setContacts(props.contacts!);
    openSocket.io("http://localhost:5000");
  }, []);
  const addNewContact = (user: User) => {
    setContacts([user, ...contacts]);
  };
  return (
    <div className={styles.container}>
      <ContactsContext.Provider value={{ contacts, setContacts }}>
        <MessagesContext.Provider value={props.messages!}>
          <Contacts />
          <Chat />
        </MessagesContext.Provider>
      </ContactsContext.Provider>
    </div>
  );
};

index.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const res = await axios.get("/api/all/contacts", {
      headers: ctx.req?.headers
    });
    const resMessages = await axios.get("/api/all/messages", {
      headers: ctx.req?.headers
    });
    return {
      contacts: res.data as Props["contacts"],
      messages: resMessages.data
    };
  } catch (error) {
    return { statusCode: error.response.status };
  }
};

export default withAuth(index);
