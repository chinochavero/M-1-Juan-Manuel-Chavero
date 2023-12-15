import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import "./commenbox.css";
import CommentUpdate from "./CommentUpdate";
import Swal from "sweetalert2";



const CommentBox = ({ post, getPost }) => {
  const { auth } = useContext(AuthContext);
  const postId = post._id
  const modalId = useId();
  
  const handleDeleteComment = (commentId) => {
    const comment = post.comments.find((comment) => comment._id === commentId);
      if (comment.author._id !== auth.user._id) {
        return console.log("error")
  } else {
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
  }}
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
                            <img src={comment.author.avatar} width="40" height="40" className="user-img rounded-circle mr-2" id="comment-image" />
                            <span><small className="font-weight-bold text-primary">{comment.author.username}</small> <small className="font-weight-bold">dice: {comment.description}</small></span>
                             {/* Renderizado condicional de los botones para editar y eliminar comentarios con auth para evitar el problema de no poder leer las
                             propiedades de user en la pagina publica */}
                              {auth && comment.author._id === auth.user._id && (
                                <>
                              <Link onClick={(e) => {
                              e.stopPropagation()
                              }}
                              data-bs-toggle="modal"
                              data-bs-target={"#comment_update" + comment._id}
                              style={{ fontSize: "15px", color: "green" }} className="icon-crear-comentario">
                              <HiOutlinePencilAlt />
                              </Link> 
                              {comment.author._id === auth.user._id && (
                              <button style={{ fontSize: "15px", color: "red" }} className="btn-delete-comment">
                              <HiOutlineTrash onClick={(e) => {
                               e.stopPropagation(); handleDeleteComment(comment._id)}}/>
                              </button> )}
                              <CommentUpdate
                              post={post}
                              getPost={getPost}
                              modalId={modalId}
                              postId={post._id}
                              commentId={comment._id}
                                />
                               </>
                            )}
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