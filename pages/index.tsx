import { NextPage, NextPageContext } from "next";
import React from "react";
import { axios } from "../Axios";
import Chat from "../components/Chat";
import Contacts from "../components/Contacts";
import { withAuth } from "../HOCs/withAuth";
import { User } from "../interfaces/User";
import styles from "../styles/main.module.css";
import Error from "next/error";
import { Users } from "../Context/users";
import { Message } from "../interfaces/Message";
import { MessagesContext } from "../Context/messagesContext";

interface Props {
  users?: User[] | [];
  messages?: Message[] | [];
  statusCode?: number;
}

const index = (props: Props) => {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <div className={styles.container}>
      <Users.Provider value={props.users!}>
        <MessagesContext.Provider value={props.messages!}>
          <Contacts />
          <Chat />
        </MessagesContext.Provider>
      </Users.Provider>
    </div>
  );
};

index.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const res = await axios.get("/api/all/users", {
      headers: ctx.req?.headers
    });
    const resMessages = await axios.get("/api/all/messages", {
      headers: ctx.req?.headers
    });
    return { users: res.data as Props["users"], messages: resMessages.data };
  } catch (error) {
    return { statusCode: error.response.status };
  }
};

export default withAuth(index);
