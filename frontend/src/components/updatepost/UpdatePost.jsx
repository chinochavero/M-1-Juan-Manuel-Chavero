import { useContext, useId, useRef, useState } from "react";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import "./updatepost.css"

const UpdatePostModel = ({ post, postId, getPost }) => {
    const labelId = useId();
    const ref = useRef();
    const { auth } = useContext(AuthContext);

    // useState porque los valores se me resetean solos al usar FormData
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [imageurl, setImageurl] = useState(post.imageurl);
    
    const handleUpdate = () => {
      fetch(`${API_URL}/post/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth.token,   
            },
            body: JSON.stringify({
                title: title,
                description: description,
                imageurl: imageurl,
            }),
        })
        .then((res) => {
            if (auth.user._id !== post.author._id) return alert("No eres el creador del post")
          
            if (title === "" || description === "" ) return Swal.fire({
              confirmButtonColor: "#14A44D",
              icon: "error",
              title: "Oops...",
              text: "Por favor completa todos los campos",
            });
            if (!res.ok) return alert("error")
            ref.current.click();
            getPost(); 
        })
    };

    return (
        <div className="modal fade" id={"update-modal" + postId} aria-labelledby={labelId} aria-hidden="true" onClick={(e) => {
            e.stopPropagation();
          }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id={labelId}>
                    Actualizar Post
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form className="modal-body" id="form_data">
                  <label className="label" htmlFor="titulo">Nuevo Titulo:</label>
                  <input className="input" id="titulo" type="text" placeholder="Titulo" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                  <label className="label" htmlFor="descripcion">Nueva descripción:</label>
                  <textarea className="textarea_update" id="descripcion" cols="55" rows="3" type="text" placeholder="Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                  <label className="label" htmlFor="imagen">Nueva imagen:</label>
                  <input className="input" id="imagen" type="url" placeholder="ImageUrl" name="image" value={imageurl} onChange={(e) => setImageurl(e.target.value)} />
                </form>
                <div className="modal-footer" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <button type="button" className="btn-cerrar" id="btn-cerrar" data-bs-dismiss="modal" ref={ref}>
                    Cerrar
                  </button>
                  <button
                    type="button" className="btn-enviar" onClick={handleUpdate}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
        </div>  
    )
};

export default UpdatePostModel;