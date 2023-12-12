import { useEffect, useState } from "react";
import PostItem from "../postitem/PostItem";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Post.module.css"

const Post = ({ posts, getPost }) => {
    
    const [filterPosts, setFilterPosts] = useState(posts);
    
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = posts.filter((post) => {
            return post.title.toLowerCase();
        });

        setFilterPosts(filtered);

    }, [posts]);

    return (
        <div>
            <Link to="/post/new" className="btn btn-success">
              Crear Post
            </Link>
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