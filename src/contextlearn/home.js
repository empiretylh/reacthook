import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { login } from "./utils/login";
export default function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>Home</h1>

      <pre>here {JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={async () => {
          const user = await login();
          setUser(user);
        }}
      >
        Login
      </button>
    </div>
  );
}
