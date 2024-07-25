import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient.js';
import { AuthContext } from '../AuthContext.jsx';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password);

    if (error) {
      setError('Login falhou. Tente novamente.');
    } else if (users.length > 0) {
      login(users[0]);
      navigate('/');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className='login-component'>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div><button type="submit">Login</button></div>
      </form>
    </div>
  );
};

export default Login;
