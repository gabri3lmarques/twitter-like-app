import React, { useState, useContext } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import './createpost.css';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError(null);

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

      setContent('');
      onPostCreated(); // Chama o método para remontar o Timeline após o post ser criado

    } catch (insertError) {
      setError(insertError.message);
    }
  };

  return (
    <div className='create-post'>
      <h3>What are you thinking?</h3>
      <form onSubmit={handleCreatePost}>
        <textarea
          placeholder="Write here.."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className='create-post__submit'>
          <button type="submit">Postar</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreatePost;
