import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId, useState } from "react";
import "./comments.css";


const CommentUpdate = ({ post, getPost, commentId }) => {
  const [ comentario, setComentario ] = useState("")
  const { auth } = useContext(AuthContext);
  const postId = post._id
  const labelId = useId();
  
  const handleEditComment = (commentId) => {
    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        description: comentario,
      }),
    })
    .then((res) => {
      if (!res.ok) return alert(" Error al actualizar el comentario");
      getPost();
    });
  };
  
  return (
    <div>
      <div className="modal fade" id={"comment_update" + commentId} aria-labelledby={labelId} aria-hidden="true" onClick={(e) => {
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
                      <form className="modal-body" id="form-comment-update" >
                        <label className="label" htmlFor="descripcion">Editar comentario:</label>
                        <textarea className="textarea_update" id="descripcion" cols="55" rows="3" type="text" placeholder="Comentario" name="description" value={comentario} onChange={(e) => {setComentario(e.target.value)}} />
                      </form>
                      <div className="modal-footer" onClick={(e) => {
                        e.stopPropagation();
                      }}>
                        <button type="button" className="btn-cerrar" id="btn-cerrar" data-bs-dismiss="modal">
                          Cerrar
                        </button>
                        <button
                          type="button" className="btn-submit" onClick={() => handleEditComment(commentId)} data-bs-dismiss="modal" >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
    
  )
};

export default CommentUpdate;