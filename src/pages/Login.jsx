import "../styleheets/Login.css";
import logo from "../img/logo.png";
import { Button } from "@nextui-org/react";
import { AiOutlineGoogle, AiFillFacebook } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import { React, useState, useEffect } from "react";
import { useNavigate , NavLink } from "react-router-dom";


import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { toast, Toaster } from "react-hot-toast";

function Login(){
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.data_aldia.is_logged_in);
    const url = useSelector((state) => state.data_aldia.url);
    const [name,setName] = useState("");
    const [password,setPassword] =useState("")
  

    const dispatch = useDispatch();
    const onLogin = async (e) => {
      e.preventDefault();

      await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          "username": name,
          "password": password,
          "login_request":true,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Module': 'user'
        },
      })
        .then((response) => {
          if (response.ok) {
          } else {
            console.error();
          }
          return response.json();
        })
        .then(function (data) {
          if (data.is_logged_in) {
            console.log(data)
            dispatch(login(data));
            const token = data.token;
            Cookies.set('token', token, { SameSite: 'None', secure: true });
  
            navigate("/", {
              replace: true,
              state: {
                logged: true,
                name,
              },
            });

          } else {
            toast((t) => (
              <span className="notification_error">
                <p>Usuario o contraseña incorrectos</p>
                <button onClick={() => toast.dismiss(t.id)}>
                  <AiFillCloseCircle />
                </button>
              </span>
            ));
          }
        });
    };
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/", { replace: true });
      }
    }, [isLoggedIn, navigate]);
    return(
        <>
            <section className="section1_login dark text-foreground bg-background" >
                <img className="section1__logoform" src={logo} alt="logoGesthor" />
                <form onSubmit={onLogin} className="formLogin" id="formLogin" method="post" action="">
                    <div className="formLogin__inputsPrincipales">
                        <input 
                            value={name}
                            name = "username"
                            onChange={(e)=>{setName(e.target.value)}}
                            type="text" 
                            placeholder="Usuario" 
                            required/>
                    </div>
                    <div className="formLogin__inputsPrincipales">
                        <input 
                            type="password" 
                            name = "password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            placeholder="Contraseña"  
                            required />
                    </div> 
                    <div className="formLogin__inputsSecundarios">
                        <div className="formLogin__inputsSecundarios--div">
                        <a href="/">Olvidé mi contraseña</a>
                        </div>  
                    </div>
                    <Button type="submit">Iniciar Sesión</Button>
                </form>
                <p>O puedes ingresar con</p>
                <div className="section1_login_buttons_content">
                <Button className="google_button" startContent={<AiOutlineGoogle/>}>
                    Google
                </Button>    
                <Button className="facebook_button" startContent={<AiFillFacebook/>}>
                    Facebook
                </Button>    
                </div>
                <NavLink  to="/newRecord" color="Foreground" >¿Aún no tienes cuenta?</NavLink>
            </section>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    )
}
export default Login;