import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import { useNavigate, useLocation  } from "react-router-dom";
import getCookie from "../Scripts/getCookies";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import 'react-confirm-alert/src/react-confirm-alert.css';
function FatherComponent(){
    let location = useLocation();
    const navigate = useNavigate()
    let token = getCookie("token");
    let setIsAuthenticated = false

    if(token){
        setIsAuthenticated=true;
    }else{
        setIsAuthenticated=false;
    }

    useEffect(() => {
        if ( token && location.pathname === "/login"){
            navigate("/")
        }
        if(!token && location.pathname !== "/newRecord"){
            navigate("/login")
        }
    }, [location.pathname, navigate, token]);
    return(
        <>
            {setIsAuthenticated === true?  <NavBar/>:<></>}
            <Outlet />
            <Toaster position="top-center" reverseOrder={true} />
        </>
    )
}
export default FatherComponent