import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import NavbarDos from "../components/Navbar/NavigationBar"; 
import Post from "../components/posteo/Post";
import styles from "../styles/Post.module.css";

function AllpostsPage() {   
    const [posts, setPosts] = useState([]);
    
    const getPost = useCallback(() => {
    
    fetch(`${API_URL}/allposts/public`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => console.log(err));
    });

    //ordenar los posts de más nuevos a más viejos.
    posts.reverse()
  
    useEffect(() => {
        getPost();

    }, [])
  
    return (
    <div className={styles.fondos}>
      <NavbarDos />
      <div className="">
          <h1 className={styles.h1}>Los secretos del viajero</h1>
          {posts.length === 0 ? <p className={styles.p}>No hay ningún post para mostrar.</p> : null}
          <main className="">
            <Post getPost={getPost} posts={posts} /> 
          </main>       
        </div>
    </div>
    )  
};

export default AllpostsPage;
