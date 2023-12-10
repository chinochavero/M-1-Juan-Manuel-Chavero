import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import "./deletepost.css"


const DeletePostModel = ({ postId, getPost }) => {
    const labelId = useId();
    const ref = useRef(null);
    

    const handleDelete = () => {
        fetch(`${API_URL}/post/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        }).then((res) => {
            if (res.status !== 200) return alert("Error al borrar el post");
            //actualizar pagina
            ref.current.click();
            getPost();
        });
    };  
    
      return ( 
        <div className="modal fade" id={"modal" + postId} aria-labelledby={labelId} aria-hidden="true" onClick={(e) => {
          e.stopPropagation();
        }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={labelId}>
                  Eliminar Post
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Estas seguro que deseas eliminar el Post?
              </div>
              <div className="modal-footer" onClick={(e) => {
                e.stopPropagation();
              }}>
                <button type="button" className="btn-cerrar" id="btn-cerrar" data-bs-dismiss="modal" ref={ref}>
                  Cerrar
                </button>
                <button
                  type="button" className="btn-eliminar" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default DeletePostModel;