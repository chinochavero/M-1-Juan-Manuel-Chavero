import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import "./comments.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

    const CommentBox = ({ post, getPost }) => {
        const { userId } = useParams();
        console.log(getPost)
        const { auth } = useContext(AuthContext)

        const handleCreateNewComment = (e) => {
            e.preventDefault();
        
            const formData = new FormData(e.target);
        
            fetch(`${API_URL}/comments/${postId}`, {
              method: "POST",
              body: JSON.stringify({
                description: formData.get("textbox"),
                author: userId,
                post: postId,
                
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: auth.token,
              },
            }).then((res) => {
              if (!res.ok) return alert("Error creating comment");              
            });
        
            formRef.current.reset();
          };         

        return (
           <div>
             <div>
                <form onSubmit={handleCreateNewComment}>
               <label htmlFor="comment-text">Deja tu comentario:</label><br />
               <textarea type="text" id="comment-text" name="textbox" className="comment-box"/>
             <div className="submit">
                <button className="submit-btn" id="submit">Enviar</button>
             </div>
                </form>
             </div>
           </div>
        )
    }

export default CommentBox;