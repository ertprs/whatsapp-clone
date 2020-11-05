import "semantic-ui-css/semantic.min.css";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "../styles/register.css";
import { axios } from "../Axios";
import { UserContext } from "../Context/userContext";
import { User } from "../interfaces/User";
import { wrapper } from "../redux";

interface Props extends AppProps {
  user: User | null;
}

function MyApp({ Component, pageProps, user }: Props) {
  return (
    <UserContext.Provider value={{ user }}>
      <Component {...pageProps} />;
    </UserContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const res = await axios.get("/api/currentUser");
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, user: res.data };
};

export default wrapper.withRedux(MyApp);
