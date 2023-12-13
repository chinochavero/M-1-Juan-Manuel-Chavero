import styles from "../styles/Post.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Post from "../components/posteo/Post";
import NavbarDos from "../components/Navbar/NavigationBar";


function PostPage () {
  
  const [posts, setPosts] = useState([]);
  const { auth } = useContext(AuthContext);
    if (!auth) return alert("Debes iniciar sesion para que puedas crear contenido")
   
    
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
    <div className={styles.fondos}>
      <NavbarDos />
      <div className="">
           <h1 className={styles.h1}>Mis Posts</h1>
           {posts.length === 0 ? <p className={styles.p}>No tienes creado ningún Post.</p> : null}
             <main className="">
               <Post getPost={getPost} posts={posts} />
             </main>
       </div>
    </div>
  ) 
};

export default PostPage;