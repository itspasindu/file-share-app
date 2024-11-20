import { useState } from 'react';
import QRCode from 'qrcode.react';
import api from '../utils/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpSecret, setTotpSecret] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/auth/register', { email, password });
      setTotpSecret(response.data.totpSecret);
    } catch (error) {
      alert('Registration failed: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
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
      <button onClick={handleRegister}>Register</button>
      {totpSecret && (
        <div>
          <p>Scan this QR code with your authenticator app:</p>
          <QRCode value={totpSecret} />
          <p>Or use this key: {totpSecret}</p>
        </div>
      )}
    </div>
  );
}
