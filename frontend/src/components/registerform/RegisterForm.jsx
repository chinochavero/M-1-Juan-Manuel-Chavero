import "./registerform.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



//Test de url de imagen

function urlHandler() {
  const url = document.getElementById("userAvatarRegisterInput").value;
  document.getElementById("avatar").setAttribute("src", url)
}

function RegisterForm() {
  const ref = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();    

    const formData = new FormData(e.target);
    
    const username = formData.get("username");
    const avatar = formData.get("avatar");
    const password = formData.get("password");
    const email = formData.get("email");
    
    const user = {
      username,
      avatar,
      password,
      email,
    };

    if(username === ""|| avatar === "" || password === "" || email === "") return Swal.fire({
      confirmButtonColor: "#008080",
      icon: "error",
      title: "Oops...",
      text: "Por favor completa todos los campos",
    })
    
    const req = await fetch(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status !== 201) {
      document.getElementById("formularioRegister").reset();
      return alert("Error al registrar usuario");
    }
      
    navigate("/login");
  };

return (
  <div className="container-fluid" id="master_container">
  <div className="row main-content bg-success text-center">
    <div className="col-md-4 text-center company__info">  
      <div className="picture">
        <img src="" alt="avatar" id="avatar" className="imagen-avatar"/>
      </div>
    </div>
    <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
      <div className="container-fluid">
        <div className="row">
          <h2>CREA UNA CUENTA</h2>
        </div>
        <div className="row">
          <form onSubmit={handleSubmit} className="form-group" id="formularioRegister">
          <div className="form-floating mb-3">
              <input type="text" className="form-control" id="userNameRegisterInput" placeholder="Username" name="username" />
              <label htmlFor="userNameRegisterInput" className="form-label">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="userAvatarRegisterInput" placeholder="Avatar" name="avatar" onChange={urlHandler}/>
              <label htmlFor="userAvatarRegisterInput" className="form-label">Tu avatar URL</label>
            </div>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="emailLoginInput" placeholder="Email" name="email" />
              <label htmlFor="emailLoginInput" className="form-label">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="passRegisterInput" placeholder="Password" name="password" />
              <label htmlFor="passRegisterInput" className="form-label">Password</label>
            </div>
            <div className="row">
              <input type="submit" value="Create" className="btn" />
            </div>
          </form>
          <div className="link" >
            <Link to="/login">Volver</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default RegisterForm;

