import { Redirect, Route } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

interface RouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Redirect to="/login" push exact />;
  } else
    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export const PublicRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};
