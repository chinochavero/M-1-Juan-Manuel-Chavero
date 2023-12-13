import { useContext, useId } from "react";
import { Link } from "react-router-dom";
import DeletePostModel from "../deletepost/DeletePostModel";
import "./postitem.css";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineChat  } from "react-icons/hi"; 
import CreateCommentModal from "../comments/Comments";
import { AuthContext } from "../../providers/AuthProvider";
import UpdatePostModel from "../updatepost/UpdatePost";
import CommentBox from "../comments/CommentBox";



const PostItem = ({ post, getPost, }) => {  
  const modalId = useId();
  const fechaDeCreacion = new Date(post.createdAt);   
  const creador = post.author.username;
  const { auth } = useContext(AuthContext);
  
  //Condicion para mostrar los botones de editar y eliminar el Post
  let hideItem = false
   if (location.pathname === "/allposts") hideItem = true 
   
  //Condicion para mostar el boton de comentarios si se esta logeado
  let hideComment = true 
   if (auth) hideComment = false

      return (
        <div className="container-box" >
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
              hidden={hideItem}
              data-bs-toggle="modal"
              data-bs-target={"#update-modal" + post._id}
              style={{ fontSize: "30px", color: "green" }} className="icon-editar">
              <HiOutlinePencilAlt />
            </Link>
            
            <Link onClick={(e) => {
              e.stopPropagation()
            }}
              hidden={hideComment}
              data-bs-toggle="modal"
              data-bs-target={"#comment-modal" + post._id}
              style={{ fontSize: "30px", color: "blue" }} className="icon-crear-comentario">
              <HiOutlineChat />
            </Link>
            <Link onClick={(e) => {
              e.stopPropagation()
            }}
              hidden={hideItem}
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
            <CommentBox post={post} getPost={getPost} />
          </div>
    </div>
  )
};

export default PostItem;