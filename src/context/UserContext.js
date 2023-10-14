import { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const defaultUserData = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState({
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  });

  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };
  const logoutContext = () => {
    setUser({ ...defaultUserData, isLoading: false });
  };
  const fetchUser = async () => {
    let res = await getUserAccount();
    if (res && +res.EC === 0) {
      const groupWithRoles = res.DT.groupWithRoles;
      let email = res.DT.email;
      let username = res.DT.username;
      let token = res.DT.access_token;
      const data = {
        isAuthenticated: true,
        token: token,
        account: {
          groupWithRoles,
          email,
          username,
        },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...defaultUserData, isLoading: false });
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
