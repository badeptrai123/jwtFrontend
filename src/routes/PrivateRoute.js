import { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const { user } = useContext(UserContext);
  if (user && user.isAuthenticated) {
    return <>{props.children}</>;
  } else {
    return <Navigate to={"/login"} />;
  }
}
