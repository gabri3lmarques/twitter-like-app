import React, { useState, useEffect, useContext } from 'react';
import supabase from '../supabaseClient';
import { AuthContext } from '../AuthContext.jsx';
import CreatePost from './CreatePost.jsx';
import './timeline.css';

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10); // Limite inicial de 10 posts
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts(limit);
  }, [limit]);

  const fetchPosts = async (postLimit) => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        user_id,
        users (
          nickname,
          profile_image_url
        ),
        likes (
          id
        )
      `)
      .order('created_at', { ascending: false })
      .limit(postLimit); // Limita o número de posts carregados

    if (error) {
      console.error('Erro ao buscar posts:', error);
    } else {
      // Verifica se há mais posts a serem carregados
      setHasMore(data.length === postLimit);
      // Atualiza os posts com os novos dados
      setPosts(data);
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      alert('Você precisa estar logado para curtir um post.');
      return;
    }

    const { data: likeData, error: likeError } = await supabase
      .from('likes')
      .insert([{ post_id: postId, user_id: user.id }])
      .single();

    if (likeError) {
      console.error('Erro ao curtir o post:', likeError);
      return;
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: [...(post.likes || []), likeData] }
          : post
      )
    );
  };

  const loadMorePosts = () => {
    setLimit((prevLimit) => prevLimit + 5); // Incrementa o limite de posts em 5
  };

  return (
    <div className='timeline'>

      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.content}</p>
              <p><strong>Por:</strong> {post.users?.nickname || 'Anônimo'}</p>
              <p><strong>Curtidas:</strong> {post.likes?.length || 0}</p>
              <p>
                <img
                  style={{ width: "50px", borderRadius: "25px" }}
                  src={post.users?.profile_image_url || 'https://users-pictures.surge.sh/users/01/user01.jpeg'}
                  alt={post.users?.nickname ? `${post.users.nickname}'s profile picture` : 'Imagem de perfil padrão'}
                />
              </p>
              {user && (
                <button onClick={() => handleLike(post.id)}>Curtir</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {hasMore && (
        <button onClick={loadMorePosts}>Carregar mais posts</button>
      )}
    </div>
  );
};

export default Timeline;
