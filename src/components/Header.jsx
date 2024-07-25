import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import LogoutButton from './LogoutButton.jsx';
import './header.css';
import logo from  '../assets/images/logo.svg';

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
    <header className="page-header">
      <Link to="/">
        <img className='logo' src={logo} />
      </Link>
      {user ? (
        <div className='page-header__menu'>
          <LogoutButton />
        </div>
      ) : (
        <div className='page-header__menu'>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
      {successMessage && <p>{successMessage}</p>}
    </header>
  );
};

export default Header;
