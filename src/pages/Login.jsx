import "../styleheets/Login.css";
import logo from "../img/logo_simple.webp";
import { Button } from "@nextui-org/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "../api/axiosNoAuthInstance";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/public/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        saveDataOnLocalStore(response)
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast((t) => (
          <span className="notification_error">
            <p>Usuario o contraseña incorrectos</p>
            <button onClick={() => toast.dismiss(t.id)}>
              <AiFillCloseCircle />
            </button>
          </span>
        ));
      } else {
        toast.error("Error de conexión");
      }
    }
  };


  const loginWhitGoogle=async (response)=>{
    try{
      const responseFromApi = await axios.post("/public/google", {
        response
      });
      if (responseFromApi.status === 200) {
        saveDataOnLocalStore(responseFromApi)
      }
    }catch(error){
      if (error.response && error.response.status === 403) {
        toast((t) => (
          <span className="notification_error">
            <p>Ah ocurrido un error, intentelo de nuevo más tarde</p>
            <button onClick={() => toast.dismiss(t.id)}>
              <AiFillCloseCircle />
            </button>
          </span>
        ));
      } else {
        toast.error("Error de conexión");
      }
    }

  }
  const onFailureGoogle=()=>{
    toast.error("Error al iniciar sesión con Google");
  }
  const saveDataOnLocalStore=(response)=>{
    const data = response.data;
    localStorage.setItem("idUser",data.idUser);
    localStorage.setItem("username",data.username);
    localStorage.setItem("name",data.name);
    localStorage.setItem("lastName",data.lastName);
    localStorage.setItem("surnamen",data.surnamen);
    localStorage.setItem("rol",data.rol);
    localStorage.setItem("photo",data.photo);
    localStorage.setItem("occupation",data.occupation);
    localStorage.setItem("fromExternalApp",data.fromExternalApp);
    localStorage.setItem("isLoggin",true);
    const token = data.token;
    Cookies.set("token", token, { SameSite: "None", secure: true });
    navigate("/");
  }

  return (
    <>
      <section className="section1_login dark text-foreground w-[100%] h-[100vh] flex justify-end">
        <div className="w-[100%] md:w-[50%] lg:w-[30%]  h-[100%] flex flex-col justify-center pr-[40px] pl-[40px] section1_login--container ">
        <div className="w-[100%] flex flex-col justify-center items-center">
          <img className="max-w-[120px] pb-[60px]" src={logo} alt="logoGesthor" />
          <p className="text-[25px]">Inicia sesión</p>
        </div>

        <form
          onSubmit={onLogin}
          className="formLogin"
          id="formLogin"
          method="post"
          action=""
        >
          <div className="formLogin__inputsPrincipales">
            <input
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Email"
              required
            />
          </div>
          <div className="formLogin__inputsPrincipales">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="formLogin__inputsSecundarios">
            <div className="formLogin__inputsSecundarios--div">
              <NavLink  to="/reset-password" className="text-[16xpx]">Olvidé mi contraseña</NavLink>
            </div>
          </div>
          <Button type="submit" className="rounded-md ">Iniciar Sesión</Button>
        </form>
        <div className="w-[100%] mt-[25px]">
          <GoogleLogin
            onSuccess={loginWhitGoogle}
            onError={onFailureGoogle}
            className="w-[100%]"
            cookiePolicy={"single_host_policy"}
            ux_mode="popup"
            prompt="select_account"
          />
        </div>
        <div className="flex gap-2 justify-center mt-[40px] w-[100%] text-[16px]">
          <p>¿Aún no tienes cuenta?</p>
          <NavLink to="/newRecord" className="text-[#FF7F3E] font-bold">
          Registrate
        </NavLink>
        </div>

        </div>
      </section>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}
export default Login;
