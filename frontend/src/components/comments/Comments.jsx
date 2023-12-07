import "./comments.css";

    const CommentBox = ({ post, getPost }) => {
      (
         <div>
            <div>
              <form>
              <label htmlFor="comment-text">Deja tu comentario:</label><br />
              <textarea type="text" id="comment-text" name="textbox" className="comment-box"/>
            <div className="submit">
               <button className="submit-btn" id="submit">Enviar</button>
            </div>
               </form>
            </div>
         </div>
        )
    };

export default CommentBox;