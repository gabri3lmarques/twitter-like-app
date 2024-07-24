import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { AuthContext } from '../AuthContext.jsx';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, setSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email || !password || !nickname) {
      setError('Todos os campos são obrigatórios.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    const { data, error } = await supabase.from('users').insert([
      {
        email,
        password,
        nickname,
        profile_image_url: profileImageUrl,
      },
    ]);

    setLoading(false);

    if (error) {
      setError('Cadastro falhou. Tente novamente.');
    } else {
      setSuccess('Cadastro realizado com sucesso!');
      navigate('/');
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
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apelido"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL da Imagem de Perfil"
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
