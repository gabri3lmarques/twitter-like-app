import React, { useState, useEffect, useContext } from 'react';
import CreatePost from './CreatePost.jsx';
import supabase from '../supabaseClient';
import { AuthContext } from '../AuthContext.jsx';
import './timeline.css';
import likeIcon from '../assets/images/like.svg';

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5); // Limite inicial de 5 posts
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
      .limit(postLimit);

    if (error) {
      console.error('Erro ao buscar posts:', error);
    } else {
      setHasMore(data.length === postLimit);
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

  const handlePostCreated = () => {
    fetchPosts(limit);
  };

  return (
    <>
      <div className='spacer'></div>
      <div className='timeline'>
        {user && <CreatePost onPostCreated={handlePostCreated} />} {/* Passa o método onPostCreated */}
        {posts.length === 0 ? (
          <p>Nenhum post encontrado.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <div className='post' key={post.id}>
                <div className='post__author'>
                  <div className='post__author-image'>
                    <img
                      src={post.users?.profile_image_url || 'https://users-pictures.surge.sh/users/01/user01.jpeg'}
                      alt={post.users?.nickname ? `${post.users.nickname}'s profile picture` : 'Imagem de perfil padrão'}
                    />
                  </div>
                  <span className='post__user-profile'>@{post.users?.nickname || 'Anônimo'}</span>
                </div>
                <p className='post__content'>{post.content}</p>
                <div className='post__likes-container'>
                  {user ? (
                    <>
                      <img src={likeIcon} className='post_like-button' onClick={() => handleLike(post.id)} />
                      <span className='post__likes-number'>{post.likes?.length || 0}</span>
                    </>
                  ) : (
                    <>
                    <img src={likeIcon} />
                    <span className='post__likes-number'>{post.likes?.length || 0}</span>
                  </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {hasMore && (
          <div className="load-more">
            <button onClick={loadMorePosts}>Carregar mais posts</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Timeline;
