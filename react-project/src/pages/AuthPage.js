import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (isSignup) => {
    const endpoint = isSignup ? '/api/signup' : '/api/login';

    const response = await fetch(`http://localhost:3001${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    localStorage.setItem('session', JSON.stringify(data));

    navigate('/products');
  };

  return (
    <div className="auth-container">
      <h2>Login / Sign Up</h2>
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
      <button onClick={() => handleAuth(false)}>Login</button>
      <button onClick={() => handleAuth(true)}>Sign Up</button>
    </div>
  );
}
