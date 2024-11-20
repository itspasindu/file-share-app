import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password, otp });
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="TOTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
