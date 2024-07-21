import React, { useState, useEffect, useContext } from 'react';
import supabase from '../supabaseClient';
import { AuthContext } from '../AuthContext.jsx';

const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchPosts = async () => {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            id,
            content,
            created_at,
            user_id,
            users (
              nickname
            ),
            likes (
              id
            )
          `)
          .order('created_at', { ascending: false });
  
        if (error) {
          console.error('Erro ao buscar posts:', error);
        } else {
          // Garantir que a estrutura de dados está correta
          const formattedData = data.map(post => ({
            ...post,
            users: post.users || { nickname: 'Anônimo' },
            likes: post.likes || []
          }));
          setPosts(formattedData);
        }
      };
  
      fetchPosts();
    }, []);
  
    const handleLike = async (postId) => {
        if (!user) {
          alert('Você precisa estar logado para curtir um post.');
          return;
        }
      
        // Adicionar uma curtida
        const { data: likeData, error: likeError } = await supabase
          .from('likes')
          .insert([{ post_id: postId, user_id: user.id }])
          .single(); // Usar .single() para obter um único registro
      
        if (likeError) {
          console.error('Erro ao curtir o post:', likeError);
          return;
        }
      
        // Atualizar a lista de posts
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: [...(post.likes || []), likeData] } // Garantir que likes não seja nulo
              : post
          )
        );
      };
      
  
    return (
      <div>
        <h1>Timeline</h1>
        {posts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <p>{post.content}</p>
                <p><strong>Por:</strong> {post.users.nickname}</p>
                <p><strong>Curtidas:</strong> {post.likes.length}</p>
                {user && (
                  <button onClick={() => handleLike(post.id)}>Curtir</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Timeline;
