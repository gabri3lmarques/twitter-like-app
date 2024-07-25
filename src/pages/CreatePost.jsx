import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './createpost.css';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      setError('Você precisa estar logado para criar um post.');
      return;
    }

    if (content.length > 280) {
      setError('O post não pode ter mais de 280 caracteres.');
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('posts')
        .insert([{ content, user_id: user.id }]);

      if (insertError) {
        throw insertError;
      }

      setSuccess('Post criado com sucesso!');
      setContent('');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redireciona após 2 segundos

    } catch (insertError) {
      setError(insertError.message);
    }
  };

  return (
    <div className='create-post'>
      <h3>What are you thinking?</h3>
      <form onSubmit={handleCreatePost}>
        <textarea
          placeholder="O que está acontecendo?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Postar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreatePost;
