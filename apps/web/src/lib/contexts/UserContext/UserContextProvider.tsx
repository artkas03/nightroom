import { useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/lib/api/endpoints";
import { setAccessToken } from "@/lib/auth/token";
import { createContext } from "react";

type User = {
  id: string;
  username: string;
  name: string;
}

type UserContextState = {
  user: User | null;
  loginUser: (username: string, password: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
};

const UserContext = createContext<UserContextState | null>(null);

type UserContextPropTypes = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: UserContextPropTypes) => {
  const [user, setUser] = useState(null);

  const refreshUserData = async () => {
    // Implementation to refresh user data
  }

  const loginUser = async (username: string, password: string) => {
    const { access_token } = await authApi.signIn({ username, password });
    setAccessToken(access_token);
    await refreshUserData();
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const userContextValue = useMemo(() => ({
    user,
    loginUser,
    refreshUserData,
  }), [user]);

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return ctx;
};
export default UserContextProvider;