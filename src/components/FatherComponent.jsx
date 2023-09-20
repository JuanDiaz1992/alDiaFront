import { Outlet, useNavigate,useLocation  } from "react-router-dom";
import NavBar from "./navBar";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
function FatherComponent(){
    let location = useLocation();
    const type_user = useSelector(state => state.auth.type_user );
    const navigate = useNavigate()
    const [isLogout,setIsLogout] = useState(false)
    useEffect(()=>{
        if(type_user === 0 && location.pathname !== "/registro" ){
            navigate("/login")
        }else if (type_user > 0 && location.pathname === "/registro"){
            navigate("/")
        }
        setIsLogout(false)
    },[type_user,isLogout,location.pathname])
    console.log(location)
    return(
        <>
            {type_user>0?  <NavBar setIsLogout={setIsLogout}/>:<></>}      
            <Outlet />
        </>
    )
}
export default FatherComponent