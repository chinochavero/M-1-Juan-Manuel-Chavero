import { useContext, useId, useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import NavbarDos from "../components/Navbar/NavigationBar";


const NewPost = () => {
  const titleId = useId();
  const descriptionId = useId();
  const [imageurlId] = useId();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageUrl] = useState("");
;
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;
    
    fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ title: title.trim(), description: description, imageurl: imageurl }),
    }).then((res) => {
      if (res.status !== 200) return alert("Error al crear el Post"),

      navigate("/post");
    });
  };

  return (
    <div>
      <NavbarDos />
      <h2>Create a new Playlist</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor={titleId}>Title:</label>
          <input type="text" id={titleId} placeholder="My new Playlist" value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }} />
          <label htmlFor={descriptionId}>Descripcion:</label>  
          <input type="text" id={descriptionId} placeholder="My new Playlist" value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }} />
          <label htmlFor={imageurlId}>Imagen desde una URL:</label>
          <input type="text" id={imageurlId} placeholder="My new Playlist" value={imageurl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewPost;