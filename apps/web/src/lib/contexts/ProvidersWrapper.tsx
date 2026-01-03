'use client';
import UserContextProvider from "./UserContext/UserContextProvider";

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default ProvidersWrapper;