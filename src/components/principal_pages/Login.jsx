import "../styleheets/login.css";
import logo from "../../img/logo.png";
import { Button, Link  } from "@nextui-org/react";
import { AiOutlineGoogle, AiFillFacebook } from 'react-icons/ai';

import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../Hoocks/userForm";

import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

function Login(){
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.is_logged_in);
    const url = useSelector((state) => state.auth.url);
    const companyName = useSelector((state) => state.auth.name_business);
    const [isLoading, setIsLoading] = useState(false);
    const [company,setCompany] = useState('Food Ease');
    const [name,setName] = useState("");
    const [password,setPassword] =useState("")
  
  
    useEffect(()=>{
      if(companyName){
        setCompany(companyName);
      }
    },[companyName]);
  
  
  
  

    const dispatch = useDispatch();
    const onLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
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
          setIsLoading(false);
          return response.json();
        })
        .then(function (data) {
          if (data.is_logged_in) {
            dispatch(login(data));
            console.log(data)
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
            Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error",
              confirmButtonText: "Ok",
              willClose: function () {},
              customClass: {
                container: "notification-modal",
              },
            });
          }
        });
      setIsLoading(false);
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
                            onChange={(e)=>{setName(e.target.value)}}
                            type="text" 
                            placeholder="Usuario" 
                            required/>
                    </div>
                    <div className="formLogin__inputsPrincipales">
                        <input 
                            type="password" 
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
                <a  href="/" color="Foreground" >¿Aún no tienes cuenta?</a>
            </section>
        </>
    )
}
export default Login;