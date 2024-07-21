import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  supabase  from '../supabaseClient';
import { AuthContext } from '../AuthContext.jsx'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('users').insert([
      {
        email,
        password,
        nickname,
        profile_image_url: profileImageUrl,
      },
    ]);

    if (error) {
      setError('Cadastro falhou. Tente novamente.');
    } else {
      login(data[0]);
      navigate('/timeline');
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apelido"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL da Imagem de Perfil"
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignUp;
