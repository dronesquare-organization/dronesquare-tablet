/* eslint-disable react-hooks/rules-of-hooks */
import { ComponentType } from "react";
import { useNavigate } from "react-router-dom";

import useAuthentication from "../hooks/useAuthentication";

const withAuth = (
  Component: ComponentType,
  { needLogin }: { needLogin: boolean }
) => {
  return (props: JSX.IntrinsicAttributes) => {
    const { isLoading, data: currentUser } = useAuthentication();

    const navigate = useNavigate();

    if (!isLoading && !currentUser && needLogin) {
      navigate("/login");
    }

    if (!isLoading && currentUser && needLogin) {
      return <Component {...props} />;
    }

    if (!isLoading && currentUser && !needLogin) {
      navigate("/");
    }

    if (!isLoading && !currentUser && !needLogin) {
      return <Component {...props} />;
    }
  };
};

export default withAuth;
