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

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

export const PublicRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/home" /> : <Component />
      }
    />
  );
};
