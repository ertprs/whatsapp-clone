import React, { useContext } from "react";
import { UserContext } from "../Context/userContext";
import Router from "next/router";
import { NextPage, NextPageContext } from "next";

export const withAuth = (WrappedComponent: any): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    const { user } = useContext(UserContext);
    console.log(user);
    if (typeof window !== "undefined" && !user) {
      console.log("reached");
      Router.push("/login");
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    if (typeof window === "undefined" && !ctx.req?.headers.cookie && ctx.res) {
      console.log(ctx.req?.headers);
      ctx.res.writeHead(301, { Location: "/login" });
      ctx.res.end();
    }
    let componentProps = {};
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }
    return { ...componentProps };
  };

  return HocComponent;
};
