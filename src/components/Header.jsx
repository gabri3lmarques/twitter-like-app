import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import LogoutButton from './LogoutButton.jsx';

const Header = () => {
  const { user, successMessage, setSuccess } = useContext(AuthContext);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccess('');
      }, 3000); // Limpa a mensagem após 5 segundos
    }
  }, [successMessage, setSuccess]);

  return (
    <header>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/create-post">Criar Post</Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Cadastro</Link>
        </>
      )}
      {successMessage && <p>{successMessage}</p>}
    </header>
  );
};

export default Header;
