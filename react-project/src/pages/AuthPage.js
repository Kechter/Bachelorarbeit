import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    const endpoint = isRegistering ? "/api/signup" : "/api/login";

    const response = await fetch(`http://localhost:3001${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    localStorage.setItem("session", JSON.stringify(data));
  };

  return (
    <div>
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <p>
        {isRegistering ? (
          <>
            Already have an account?
            <button type="button" onClick={() => setIsRegistering(false)}>
              Login
            </button>
          </>
        ) : (
          <>
            Don’t have an account?
            <button type="button" onClick={() => setIsRegistering(true)}>
              Register
            </button>
          </>
        )}
      </p>
    </div>
  );
}
