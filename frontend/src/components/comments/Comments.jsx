import { useId, useRef, useState } from "react";
import { API_URL } from "../../utils/consts";
import "./comments.css";

const CreateCommentModal = ({ postId, getPost }) => {
   const labelId = useId();
   const ref = useRef(null);

   const [comment, setComment] = useState("")
   const handleInputChange = ({target}) => {
    setComment(target.value)
   }

   const handleSubmit = () => {
      fetch(`${API_URL}/comments/${postId}`, {
         method: "POST",
         body: JSON.stringify({
            description: comment,
         }),
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      })
      .then((res) => {
         if (!res.ok) return alert("Error al crear el comentario");
         ref.current.click();
         getPost();
      } );
   };

   return (
      <div className="modal fade" id={"comment-modal" + postId} aria-labelledby={labelId} aria-hidden="true" onClick={(e) => {
        e.stopPropagation();
      }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={labelId}>
              Dinos en que estas pensando:
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <textarea name="comment-area" id="commentbox" cols="55" rows="3" value={comment} onChange={handleInputChange}></textarea>
          </div>
          <div className="modal-footer" onClick={(e) => {
            e.stopPropagation()
          }}>
            <button type="button" className="btn-cerrar" id="btn-cerrar" data-bs-dismiss="modal" ref={ref}>
              Cerrar
            </button>
            <button
              type="button" className="btn-submit" onClick={handleSubmit}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
   )
};

export default CreateCommentModal;