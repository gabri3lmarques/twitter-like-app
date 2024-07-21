import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import LogoutButton from './LogoutButton.jsx';


const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/create-post">Criar Post</Link>
          <Link to="/timeline">Timeline</Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Cadastro</Link>
        </>
      )}
    </header>
  );
};

export default Header;
