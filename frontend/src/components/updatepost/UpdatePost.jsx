import { useContext, useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";

const UpdatePostModel = ({ post, postId, getPost }) => {
    const labelId = useId();
    const ref = useRef();
    const { auth } = useContext(AuthContext);
   
   
    
    const handleUpdate = () => {
        const formElement = document.getElementById("form_data");
        const formData = new FormData(formElement);
           
        fetch(`${API_URL}/post/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth.token,   
            },
            body: JSON.stringify({
                title: formData.get("title"),
                description: formData.get("description"),
                imageurl: formData.get("image"),
            }),
        })
        .then((res) => {
            if (!res.ok) return alert("Error al actualizar el post");
            ref.current.click();
            getPost();
        })
    }
    return (
        <div className="modal fade" id={"update-modal" + postId} aria-labelledby={labelId} aria-hidden="true" onClick={(e) => {
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
                <form className="modal-body" id="form_data">
                  <input className="" id="titulo" type="text" placeholder="Titulo" name="title" defaultValue={post.title}/>
                  <input className="" id="descripcion" type="text" placeholder="Description" name="description"  />
                  <input className="" type="imagen" placeholder="ImageUrl" name="image"  />
                </form>
                <div className="modal-footer" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <button type="button" className="btn-cerrar" id="btn-cerrar" data-bs-dismiss="modal" ref={ref}>
                    Cerrar
                  </button>
                  <button
                    type="button" className="btn-eliminar" onClick={handleUpdate}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
        </div>  
    )
};

export default UpdatePostModel;