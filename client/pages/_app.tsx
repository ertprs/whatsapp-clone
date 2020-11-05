import "semantic-ui-css/semantic.min.css";
import App, { AppContext, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { axios } from "../Axios";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const res = await axios.get("/api/currentUser");
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, user: res.data };
};

export default MyApp;
