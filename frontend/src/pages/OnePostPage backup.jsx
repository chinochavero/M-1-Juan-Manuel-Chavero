import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import PostItem from "../components/postitem/PostItem";

const IdPostPage = () => {
    const { postId } = useParams();    
    const [post, setPost] = useState(null);
    const { auth } = useContext(AuthContext);
    
    const getPost = () => {   
        fetch(`${API_URL}/post/${postId}`, {
            headers: {
                Authorization: auth.token,
            },
        })
        .then((res) => {if (res.status !== 200) return alert("error"); return res.json()})
        .then((data) => {setPost(data)});
    };
    
    useEffect(() => {
        getPost();
    }, [postId, auth]);
    console.log(post)
    
    return (
        console.log(post)
      
    )

}; ///cierre

export default IdPostPage;