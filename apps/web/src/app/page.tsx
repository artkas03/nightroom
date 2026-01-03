'use client';
import { useUserContext } from "@/lib/contexts/UserContext/UserContextProvider";
import { Button } from "@mui/material";

export default function Home() {
  const { loginUser } = useUserContext();

  const handleOnClick = () => {
    loginUser("alice", "secret");
  };

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <Button onClick={handleOnClick}>
        Sign In
      </Button>
    </div>
  );
}
