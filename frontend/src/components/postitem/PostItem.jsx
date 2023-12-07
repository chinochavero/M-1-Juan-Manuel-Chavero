import { useContext, useId } from "react";
import { Link } from "react-router-dom";
import DeletePostModel from "../deletepost/DeletePostModel";
import "./postitem.css";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineChat  } from "react-icons/hi"; 

const PostItem = ({ post, getPost, onClick }) => {  
  const modalId = useId();
  const fechaDeCreacion = new Date(post.createdAt);   
  const creador = post.author.username;
  
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
          <Link style={{ fontSize: "30px", color: "green" }} className="icon-editar">
          <HiOutlinePencilAlt />
          </Link>
            <Link style={{ fontSize: "30px", color: "blue" }}className="icon-crear-comentario">
                <HiOutlineChat />
            </Link>
            <Link onClick={(e) => {
              e.stopPropagation()
              }}
              data-bs-toggle="modal"
              data-bs-target={"#modal" + post._id}
              style={{ fontSize: "30px", color: "red" }} className="icon-borrar"
            >
                <HiOutlineTrash />
            </Link>                    
                <DeletePostModel
                  getPost={getPost}
                  modalId={modalId}
                  postId={post._id}
                />
          </div>           
        </div>
          {/* <div>
            <div>
              <CommentBox />               
          </div>
          {post.comments.map((comment) => {              
            return (                   
              <div className="row d-flex justify-content-center" id="comment-container">
                <div className="col-md-12" id="comment-box">
                  <div className="headings d-flex justify-content-center align-items-center" id="comment-subcon">                  
                    <div className="card" id="comment-card">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="user d-flex flex-row align-items-center">
                            <img src={comment.author.avatar} width="40" className="user-img rounded-circle mr-2" id="card-image" />
                            <span><small className="font-weight-bold text-primary">{comment.author.username}</small> <small className="font-weight-bold">dice: {comment.description}</small></span>          
                          </div>      
                        </div>              
                    </div>
                  </div>
                </div>
              </div>
       )})};        
    </div>   */}
    </div>
  );
};

export default PostItem;

