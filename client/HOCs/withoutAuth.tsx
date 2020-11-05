import { NextPage, NextPageContext } from "next";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import Router from "next/router";

export const withoutAuth = (WrappedComponent: NextPage): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    const { user } = useContext(UserContext);
    if (typeof window !== "undefined" && user) {
      Router.back();
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    if (typeof window === "undefined" && !ctx.req?.headers.cookie && ctx.res) {
      ctx.res.writeHead(301, { Location: "/" });
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
