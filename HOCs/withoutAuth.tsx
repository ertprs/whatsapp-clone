import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

export const withoutAuth = (WrappedComponent: NextPage): React.FC => {
  const HocComponent = (props: any): JSX.Element => {
    const { currentUser } = useSelector((state: Redux) => state.user);
    console.log("withoutAuth", currentUser);
    if (typeof window !== "undefined" && currentUser) {
      Router.replace("/");
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };

  HocComponent.getInitialProps = async (ctx: NextPageContext) => {
    if (typeof window === "undefined" && ctx.req?.headers.cookie && ctx.res) {
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
