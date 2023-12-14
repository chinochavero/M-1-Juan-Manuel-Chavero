import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import "./commenbox.css";
import CommentUpdate from "./CommentUpdate";
import CommentDelete from "./CommentDelete";
import Swal from "sweetalert2";


const CommentBox = ({ post, getPost }) => {
  const { auth } = useContext(AuthContext);
  const postId = post._id
  const labelId = useId();
  const ref = useRef(null);
  const modalId = useId();
 
  
  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Tu comentario se irá para siempre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC4C64",
      cancelButtonColor: "#7a7a7a",
      confirmButtonText: "Si, borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/comments/${postId}/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: auth.token,
          }}),
          Swal.fire({
          title: "Borrado!",
          text: "Tu comentario a sido eliminado.",
          icon: "success",
        });
        getPost();
      }
    });
  }


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
                              data-bs-target={"#comment_update" + comment._id}
                              style={{ fontSize: "15px", color: "green" }} className="icon-crear-comentario">
                              <HiOutlinePencilAlt />
                              </Link>
                              <button style={{ fontSize: "15px", color: "red" }} className="btn-delete-comment">
                              <HiOutlineTrash onClick={(e) => {
                               e.stopPropagation(); handleDeleteComment(comment._id)}}/>
                              </button>
                              <CommentUpdate
                              post={post}
                              getPost={getPost}
                              modalId={modalId}
                              postId={post._id}
                              commentId={comment._id}
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