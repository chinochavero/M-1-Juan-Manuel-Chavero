import { useContext, useId, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/consts";

const CommentDelete = ({ post, getPost, commentId }) => {
  const { auth } = useContext(AuthContext);
  const postId = post._id
  const labelId = useId();

    const handleDeleteComment = (commentId) => {
        fetch(`${API_URL}/comments/${postId}/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: auth.token,
          },
        })
        .then((res) => {
          if (!res.ok) return alert("Error al borrar el comentario");
          getPost(); 
        });
      };

      return (
        <div>
        <div className="modal fade" id={"comment_delete" + commentId} aria-labelledby={labelId} aria-hidden="true" onClick={(e) => {
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
                        
                        <div className="modal-footer" onClick={(e) => {
                          e.stopPropagation();
                        }}>
                          <button type="button" className="btn-cerrar" id="btn-cerrar" data-bs-dismiss="modal">
                            Cerrar
                          </button>
                          <button
                            type="button" className="btn-submit" onClick={(e) => {
                            e.stopPropagation(); handleDeleteComment(commentId)}} 
                            >
                            Enviar
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
      )
};

export default CommentDelete;