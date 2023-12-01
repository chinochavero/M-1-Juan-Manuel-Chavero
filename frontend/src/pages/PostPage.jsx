import styles from "../styles/Playlist.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Post from "../components/posteo/Post";
import NavbarDos from "../components/Navbar/NavigationBar";
import CommentBox from "../components/comments/Comments";

function PostPage () {
  const [posts, setPosts] = useState([]);

  const { auth } = useContext(AuthContext);

  const getPost = useCallback(() => {
    fetch(`${API_URL}/post`, {
      headers: {
        Authorization: auth.token,
      },
    })
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => console.log(err));
  
  }, [auth.token]);

  useEffect(() => {
    getPost();
  }, [auth, getPost]);

  return (
    <div className="navbar">
      <NavbarDos />
      <div className={styles.container}>
      <h1>My playlists</h1>
      <main className={styles.section}>
        <Post getPost={getPost} posts={posts} />
        <div>
          <CommentBox getPost={getPost} posts={posts}/>
        </div>
      </main>
      </div>
    </div>
  ); 
};

export default PostPage;