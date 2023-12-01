import  "./loginForms.css";
import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";



   

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

    if (user.email === "") {
       return alert()
      }
 

    const req = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status !== 200) {
      document.getElementById("formularioLogin").reset();
      return alert("Error al iniciar sesión");
    }

    const res = await req.json();

    login(res);

   
    navigate("/");

    
  };

  return (
      
      <div className="container-fluid">
          <div className="row main-content bg-success text-center">
            <div className="col-md-4 text-center company__info">
              <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
              <h4 className="company_title">Your Company Logo</h4>
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
                    <div className="d-flex justify-content-center">
                      <div className="box">
                      <input type="checkbox" className="checkboxLogin" id="check" />
                      </div>
                      <label htmlFor="check">Remember Me!</label>
                    </div>
                    <div className="row">
                      <input type="submit" value="Submit" className="btn" />
                    </div>
                  </form>
                </div>
                <div className="row">
                  <p>Don't have an account? <a href="./Register">Register Here</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

  );
}

export default LoginForm;
