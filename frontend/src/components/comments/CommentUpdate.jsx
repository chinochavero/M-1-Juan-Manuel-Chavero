import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId, useRef } from "react";
import "./commenbox.css";


const CommentUpdate = ({ post, getPost }) => {
  const { auth } = useContext(AuthContext);
  const postId = post._id
  const labelId = useId();
  const ref = useRef(null);

 
  
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
     const formElement = document.getElementById("form-comment-update")
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
      getPost();
    });
   
  };

  
  return (
    <div>            
    {post.comments.map((comment) => {  
        return (  
            <div key={comment._id} className="" id="">
    <div className="modal fade" id={"comment_update" + postId} aria-labelledby={labelId} aria-hidden="true" onClick={(e) => {
        e.stopPropagation();
      }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={labelId}>
                Comentario:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="modal-body" id="form-comment-update">
              <label className="label" htmlFor="descripcion">Editar comentario:</label>
              <textarea className="textarea_update" id="descripcion" cols="55" rows="3" type="text" placeholder="Description" name="description" />
            </form>
            <div className="modal-footer">
              <button type="button" className="btn-cerrar" id="btn-cerrar" data-bs-dismiss="modal" ref={ref}>
                Cerrar
              </button>
              <button
                type="button" onClick={(e) => {e.stopPropagation(); handleEditComment(comment._id)}}>
                Enviar
              </button>
            </div>
          </div>
        </div>
    </div>
    </div>
        )})}  
    </div>
)
};

export default CommentUpdate;