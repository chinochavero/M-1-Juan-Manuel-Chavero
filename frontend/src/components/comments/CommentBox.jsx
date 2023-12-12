import "./commenbox.css"

const CommentBox = ({ post }) => {
    
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