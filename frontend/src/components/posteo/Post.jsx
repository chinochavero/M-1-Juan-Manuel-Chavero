import { useContext, useEffect, useState } from "react";
import PostItem from "../postitem/PostItem";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "../../styles/Post.module.css"

const Post = ({ posts, getPost }) => {
  const { auth } = useContext(AuthContext);
  const [filterPosts, setFilterPosts] = useState(posts);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
        const filtered = posts.filter((post) => {
            return post.title.toLowerCase().includes(search.toLowerCase());
        });

        setFilterPosts(filtered);

    }, [posts, search]);

    const handleSearchInput = (e) => {
      setSearch(e.target.value);
    }

    const handleSearchButton = () => {
      const filtered = posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterPosts(filtered)
    };
    
    return (
        <div>
          {auth && (
            <Link to="/post/new" className="btn btn-success">
              Crear Post
            </Link> )}
            <div className={styles.search_container}>
              <input className={styles.search_input} type="text" placeholder=" Search post..." value={search} onChange={handleSearchInput}/>
              <button onClick={handleSearchButton} className={styles.search_button}>
                Buscar
              </button>
              </div>
              {filterPosts.map((post) => {
                return (
                  <PostItem getPost={getPost} key={post._id} post={post} onClick={() =>{
                    navigate(`/post/${post._id}`)
                    }}
                    />
                )})}
         </div>
    )
};

export default Post;