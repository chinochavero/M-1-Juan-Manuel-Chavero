import { useContext, useId, useState } from "react";
import { Link } from "react-router-dom";
import DeletePostModel from "../deletepost/DeletePostModel";
import "./postitem.css";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineChat  } from "react-icons/hi"; 
import CreateCommentModal from "../comments/Comments";
import { AuthContext } from "../../providers/AuthProvider";
import UpdatePostModel from "../updatepost/UpdatePost";



const PostItem = ({ post, getPost, onClick }) => {  
  const modalId = useId();
  const fechaDeCreacion = new Date(post.createdAt);   
  const creador = post.author.username;
  
  // Probando renderizado condicional
  const { auth } = useContext(AuthContext)
  const [showButtons, setShowButtons] = useState("true");

    if (auth) {
      return (
        <div className="container-box" onClick={onClick}>
      <div className="card" >
          <div>
            <h5 className="card-title">{post.title}</h5>
          </div>
            <img src={post.imageurl} className="card-img-top" alt="..." />
          <div className="card-body">            
            <p className="card-text">{post.description}</p>
          </div>
          <div className="fecha">
             <p className="fecha-text">Creado el {fechaDeCreacion.toLocaleDateString()} por {creador}</p> 
          </div>          
          <div>
            <Link onClick={(e)=> {
              e.stopPropagation()
              }} 
              data-bs-toggle="modal"
              data-bs-target={"#update-modal" + post._id}
              style={{ fontSize: "30px", color: "green" }} className="icon-editar">
            <HiOutlinePencilAlt />
            </Link>
            <Link onClick={(e) => {
              e.stopPropagation()
            }}
              data-bs-toggle="modal"
              data-bs-target={"#comment-modal" + post._id}
              style={{ fontSize: "30px", color: "blue" }} className="icon-crear-comentario">
                <HiOutlineChat />
            </Link>
            <Link onClick={(e) => {
              e.stopPropagation()
            }}
              data-bs-toggle="modal"
              data-bs-target={"#modal" + post._id}
              style={{ fontSize: "30px", color: "red" }} className="icon-borrar">
                <HiOutlineTrash />
            </Link>                    
                <DeletePostModel
                  getPost={getPost}
                  modalId={modalId}
                  postId={post._id}
                />
            <CreateCommentModal 
                getPost={getPost}
                modalId={modalId}
                postId={post._id}
              />
                 <UpdatePostModel 
                 getPost={getPost}
                 modalId={modalId}
                 postId={post._id}
                 post={post}
              /> 
          </div>           
        </div>
    </div>
  );

      
    } else {
      return (
        <div className="container-box" onClick={onClick}>
      <div className="card" >
          <div>
            <h5 className="card-title">{post.title}</h5>
          </div>
            <img src={post.imageurl} className="card-img-top" alt="..." />
          <div className="card-body">            
            <p className="card-text">{post.description}</p>
          </div>
          <div className="fecha">
             <p className="fecha-text">Creado el {fechaDeCreacion.toLocaleDateString()} por {creador}</p> 
          </div>          
                    
        </div>
    </div>
  );
}};

export default PostItem;