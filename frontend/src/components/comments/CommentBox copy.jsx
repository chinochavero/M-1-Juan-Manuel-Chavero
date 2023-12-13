import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import "./commenbox.css";


const CommentBox = ({ post, getPost }) => {
  const { auth } = useContext(AuthContext);
  const postId = post._id
 
  
  const handleDeleteComment = (commentId) => {
    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    }).then((res) => {
      if (!res.ok) return alert("Error deleting music");
      getPost(); 
    });
  };

  const handleEditComment = (commentId) => {
    const formElement = document.getElementById("comment-form")
    const formData = new FormData(formElement);
    const description = formData.get("description")
    

    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        description: description,
      }),
    })
    .then((res) => {
      if (!res.ok) return alert("");
      
    });
   
  };

  
  return (
         <div>            
          {post.comments.map((comment) => {              
            return (
            <div key={comment._id} className="row d-flex justify-content-center" id="comment-container">
                <div className="col-md-12" id="comment-box">
                  <div className="headings d-flex justify-content-center align-items-center" id="comment-subcon">                  
                    <div className="card" id="comment-card">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="user d-flex flex-row align-items-center" id="comment_bx">
                            <img src={comment.author.avatar} width="40" className="user-img rounded-circle mr-2" id="comment-image" />
                            <span><small className="font-weight-bold text-primary">{comment.author.username}</small> <small className="font-weight-bold">dice: {comment.description}</small></span>  
                              <div>
                             
                                {/* <button onClick={(e) => {e.stopPropagation(); handleDeleteComment(comment._id)}}>Borrar</button>
                                  <form id="comment-form">
                                  <input id="input_comment" type="text" name="description" />
                                  <button onClick={(e) => {e.stopPropagation(); handleEditComment(comment._id)}}>Editar</button>
                                  </form> */}
                              </div>
                          </div>      
                        </div>              
                    </div>
                  </div>
                </div>
              </div>
           )})}      
         </div>
    
    )
};

export default CommentBox;