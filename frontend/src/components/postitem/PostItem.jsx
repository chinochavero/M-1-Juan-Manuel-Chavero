import { useId } from "react";
import DeletePostModel from "../deletepost/DeletePostModel";
import "./postitem.css";




const PostItem = ({ post, getPost }) => {
  const modalId = useId();
  const fechaDeCreacion = new Date(post.createdAt)
  
  return (
    <div>
      <div className="card" >
          <div>
            <h5 className="card-title">{post.title}</h5>
          </div>
            <img src={post.imageurl} className="card-img-top" alt="..." />
          <div className="card-body">            
            <p className="card-text">{post.description}</p>
          </div>
          <div className="fecha">
            <p>Creado el {fechaDeCreacion.toLocaleDateString()}</p>
          </div>
        </div>
      <div>
                       
        <DeletePostModel
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />
      </div>
    </div>
  );
};

export default PostItem;