import { Outlet, useNavigate,useLocation  } from "react-router-dom";
import NavBar from "./navBar";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import getCookie from "../Scripts/getCookies";
import setCookie from "../Scripts/borrarCookies";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { Toaster } from "react-hot-toast";
function FatherComponent(){
    const dispatch = useDispatch();
    let location = useLocation();
    const type_user = useSelector(state => state.data_aldia.type_user );
    const url = useSelector(state => state.data_aldia.url );
    const validateSession=()=>{
        fetch(`${url}validateSession`, {
            method:"get",
            mode:"cors",
            headers:{
                Authorization: "Token " + getCookie("token"),
                Module: "user",
            }     
        })
        .then(response=>response.json())
        .then(data=>{
            if (!data.status === 200) {
                dispatch(logout());
                setCookie("loggedIn", false);
            }
        })
        .catch(error => {
            dispatch(logout());
            setCookie("loggedIn", false);
        })


    }


    const navigate = useNavigate()
    const [isLogout,setIsLogout] = useState(false)
    useEffect(()=>{
        validateSession()
        if(type_user === 0 && location.pathname !== "/newRecord" ){
            navigate("/login")
        }else if (type_user > 0 && location.pathname === "/newRecord"){
            navigate("/")
        }
        setIsLogout(false)
    },[type_user,isLogout,location.pathname])
    return(
        <>
            {type_user>0?  <NavBar setIsLogout={setIsLogout}/>:<></>}      
            <Outlet />
            <Toaster position="top-center" reverseOrder={true} />
        </>
    )
}
export default FatherComponent