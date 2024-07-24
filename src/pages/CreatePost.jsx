import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      setError('Você precisa estar logado para criar um post.');
      return;
    }

    const { error: insertError } = await supabase
      .from('posts')
      .insert([{ content, user_id: user.id }]);

    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess('Post criado com sucesso!');
      setContent('');
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Criar Post</h1>
      <form onSubmit={handleCreatePost}>
        <textarea
          placeholder="O que está acontecendo?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Postar</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default CreatePost;
