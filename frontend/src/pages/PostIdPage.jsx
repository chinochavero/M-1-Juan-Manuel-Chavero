import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import NavbarDos from "../components/Navbar/NavigationBar";

const PostIdPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { auth } = useContext(AuthContext);
  const formRef = useRef(null);

  const getPost = () => {
    fetch(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
    .then((res) => {
      if (res.status !== 200) return alert("Error al conseguir el post");
      return res.json();
    })
    .then((data) => {
      setPost(data);
    });
  };


  return (
    <div>
    <div>
      <NavbarDos />
      </div>
        <div className="card" styles="width: 18rem;">
          <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                  <h5 class="card-title">{post.title}</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  
              </div>
        </div>
     </div>   
  )
};

export default PostIdPage;