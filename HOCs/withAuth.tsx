import React from "react";
import Router from "next/router";
import { NextPageContext } from "next";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

export const withAuth = (WrappedComponent: any): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    console.log("props from with auth", props);
    const { currentUser } = useSelector((state: Redux) => state.user);
    if (typeof window !== "undefined" && !currentUser?._id) {
      Router.push("/login");
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    if (typeof window === "undefined" && !ctx.req?.headers.cookie && ctx.res) {
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
