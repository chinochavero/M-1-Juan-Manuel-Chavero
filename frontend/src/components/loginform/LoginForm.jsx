import  "./loginForms.css";
import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function LoginForm() {
  const ref = useRef(null);

  const emailRef = useId();
  const passwordRef = useId();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email")
    const password = formData.get("password");
    
    const user = {
      email,
      password,
    };

    if (user.email === "" || user.password === "") {
      return Swal.fire({
        confirmButtonColor: "#008080",
        icon: "error",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      })
    };
 

    const req = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status !== 200) {
      document.getElementById("formularioLogin").reset();
      return Swal.fire({
        title: "Seguro que tienes cuenta?",
        text: "Alguno de los datos insertados no es correcto",
        icon: "question",
        confirmButtonColor: "#008080"
      })
    };

    const res = await req.json();

    login(res);
    navigate("/post");
  };
  return (
      <div className="container-fluid" id="master_container">
          <div className="row main-content bg-success text-center">
            <div className="col-md-4 text-center company__info">
              <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
              <Link className="link" to="/allposts" title="Mira los posteos">
              <h4 className="company_title">Disfruta el viaje!</h4>
              </Link>
            </div>
            <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div className="container-fluid">
                <div className="row">
                  <h2>LOG IN</h2>
                </div>
                <div className="row">
                  <form onSubmit={handleSubmit} className="form-group" id="formularioLogin">
                    <div className="form-floating mb-3">
                      <input type="email" className="form-control" id="emailLoginInput" placeholder="Email" name="email" />
                      <label htmlFor="emailLoginInput" className="form-label">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="password" className="form-control" id="passLoginInput" placeholder="Password" name="password" />
                      <label htmlFor="passLoginInput" className="form-label">Password</label>
                    </div>
                    <div className="row">
                      <input type="submit" value="Submit" className="btn" />
                    </div>
                  </form>
                </div>
                <div className="row">
                  <p>No tienes una cuenta? <a href="./Register">Registrate aquí</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

  );
}

export default LoginForm;
