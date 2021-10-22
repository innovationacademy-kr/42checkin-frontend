import React, { ComponentType } from "react";
import { RouteProps, Route, useHistory } from "react-router-dom";
import useUser from "../../utils/hooks/useUser";

interface IProps extends RouteProps {
  component: ComponentType<any>;
}
const Auth: React.FC<IProps> = ({ component: Component, location, ...restProps }) => {
  const {
    user: { isLogin },
  } = useUser();
  const history = useHistory();
  return (
    <Route
      {...restProps}
      render={(props) => {
        // 일단 어드민이면 통과시킴
        if (location?.pathname.startsWith("/admin")) return <Component {...props} />;
        if (!isLogin) history.push("/");
        return <Component {...props} />;
      }}
    />
  );
};

export default Auth;
