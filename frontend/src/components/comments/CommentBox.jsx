import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { HiOutlineChat } from "react-icons/hi";
import "./commenbox.css";
import CommentUpdate from "./CommentUpdate";


const CommentBox = ({ post, getPost }) => {
  const { auth } = useContext(AuthContext);
  const postId = post._id
  const labelId = useId();
  const ref = useRef(null);
  const modalId = useId();
 
  
  const handleDeleteComment = (commentId) => {
    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error deleting music");
      getPost(); 
    });
  };

  const handleEditComment = (commentId) => {
    const formElement = document.getElementById("comment-form")
    const formData = new FormData(formElement);
    const description = formData.get("description")
    

    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        description: description,
      }),
    })
    .then((res) => {
      if (!res.ok) return alert("");
      
    });
   
  };

  
  return (
         <div>            
          {post.comments.map((comment) => {              
            return (
            <div key={comment._id} className="row d-flex justify-content-center" id="comment-container">
                <div className="col-md-12" id="comment-box">
                  <div className="headings d-flex justify-content-center align-items-center" id="comment-subcon">                  
                    <div className="card" id="comment-card">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="user d-flex flex-row align-items-center" id="comment_bx" >
                            <img src={comment.author.avatar} width="40" className="user-img rounded-circle mr-2" id="comment-image" />
                            <span><small className="font-weight-bold text-primary">{comment.author.username}</small> <small className="font-weight-bold">dice: {comment.description}</small></span>
                              <Link onClick={(e) => {
                              e.stopPropagation()
                              }}
                              data-bs-toggle="modal"
                              data-bs-target={"#comment_update" + post._id}
                              style={{ fontSize: "30px", color: "blue" }} className="icon-crear-comentario">
                               
                                   <HiOutlineChat />
                              </Link>
                              <CommentUpdate
                              post={post}
                              getPost={getPost}
                              modalId={modalId}
                              postId={post._id}
                                />
                              </div>
                          </div>      
                        </div>              
                    </div>
                  </div>
                </div>
                )})}      
         </div>
    
    )
};

export default CommentBox;