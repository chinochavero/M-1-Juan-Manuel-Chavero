import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import PostItem from "../components/postitem/PostItem";
import NavbarDos from "../components/Navbar/NavigationBar";


const IdPostPage = () => {
    const { postId } = useParams();      
    const [post, setPost] = useState({ author:"", comments:[] });
    const { auth } = useContext(AuthContext);
    

    const getPost = () => {
        fetch(`${API_URL}/post/${postId}`, {
            headers: {
              "Content-Type": "application/json",
               Authorization: auth.token,
            },
        })
        .then((res) => {return res.json()})
        .then((data) => {setPost(data)});
    };

     useEffect(() => {
        getPost();
     }, [postId, auth]);
     
    return (
        <div>
            <div>
                <NavbarDos />
            </div>
        <div>
        <PostItem getPost={getPost} key={post._id} post={post} onClick={() => {
            navigate(`/post/${post._id}`)}} />
        </div>
        <div>            
          {post.comments.map((comment) => {              
            return (                   
              <div className="row d-flex justify-content-center" id="comment-container">
                <div className="col-md-12" id="comment-box">
                  <div className="headings d-flex justify-content-center align-items-center" id="comment-subcon">                  
                    <div className="card" id="comment-card">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="user d-flex flex-row align-items-center">
                            <img src={comment.author.avatar} width="45" className="user-img rounded-circle mr-2" id="card-image" />
                            <span><small className="font-weight-bold text-primary">{comment.author.username}</small> <small className="font-weight-bold">dice: {comment.description}</small></span>          
                          </div>      
                        </div>              
                    </div>
                  </div>
                </div>
              </div>
            )})}      
        </div>
    </div>
    )
};

export default IdPostPage;