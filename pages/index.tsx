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

const io = openSocket.io("http://localhost:5000");

interface Props {
  messages?: Message[] | [];
  statusCode?: number;
}

const index = (props: Props) => {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  const [contacts, setContacts] = useState<User[] | [] | null>(null);
  // console.log(contacts);
  useEffect(() => {
    const fetchContacts = async () => {
      const res = await axios.get("/api/all/contacts");
      setContacts(res.data);
      console.log("upper", contacts);
    };
    fetchContacts();
    console.log("upper", contacts);
    io.on("contacts", (data: { action: string; contact: User }) => {
      if (data.action === "create") {
        console.log(contacts);
        setContacts([data.contact, ...contacts]);
      }
    });
  }, [contacts ? contacts.length : contacts]);
  // addNewContact(data.contact);
  // const addNewContact = (user: User) => {
  //   console.log(contacts);
  //   console.log(user);
  //   setContacts([user]);
  // };

  return (
    <div className={styles.container}>
      <ContactsContext.Provider value={{ contacts: contacts, setContacts }}>
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
    const resMessages = await axios.get("/api/all/messages", {
      headers: ctx.req?.headers
    });

    return {
      messages: resMessages.data
    };
  } catch (error) {
    return { statusCode: error.response.status };
  }
};

export default withAuth(index);
