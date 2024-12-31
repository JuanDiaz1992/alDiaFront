import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Avatar,
} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import iconAcount from "../img/icons/account_circle.svg";
import add from "../img/icons/add.svg";
import cancel from "../img/icons/cancel.svg";
import settings from "../img/icons/Settings.svg";
import stats from "../img/icons/Stats.svg";
import question from "../img/icons/question.svg";
import notificarion from "../img/icons/notifications.svg"
import { useState, useEffect } from 'react';
import Logo from "../img/logoNavBar.png";
import "../styleheets/navBar.css";
import { NavLink, useLocation } from "react-router-dom";
import dafaultPhotoUser from "../img/default_user.png";
import { TbReportSearch, TbHome2, TbHistory, TbHelp } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import getPhotoUrl from "../Scripts/getPhoto";
import { useProfilePictureContext } from "../context/profilePicture"
import useLogout  from "../customHooks/logout";
function NavBar() {
  const { isChague } = useProfilePictureContext();
  const { dispatchPicturProfile } = useProfilePictureContext();
  const location = useLocation();
  const logout = useLogout();
  const user = {
    "photo": localStorage.getItem("photo"),
    "name" : localStorage.getItem("name"),
    "lastName": localStorage.getItem("lastName"),
    "occupation": localStorage.getItem("occupation")
  };
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const getPicture=()=>{
    const url = localStorage.getItem("photo");
    console.log(url)
    if(url === null || url === "" || url === "null" || url === undefined){
      setProfilePhotoUrl(dafaultPhotoUser);
    }else{
      try {
        if(url.startsWith("/private")){
          getPhotoUrl(url)
          .then(response=>{
            setProfilePhotoUrl(response);
          })
        }else{
          setProfilePhotoUrl(url);
        }
      } catch (error) {
        setProfilePhotoUrl(dafaultPhotoUser);
      }

    }
    if(isChague.isChanged){
      dispatchPicturProfile({ type: 'RESETSTATUS' });
    }
  }
  useEffect(() => {
    getPicture();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChague.isChanged]);

  const navLinks = [
    { path: "/", label: "Inicio", icon:stats },
    { path: "/registro_financiero", label: "Añadir Registro", icon: add },
    { path: "/profile", label: "Perfil", icon: iconAcount},
    { path: "/configuration", label: "Ajustes", icon: settings  },
  ];

  return (
    <>
      <Navbar className="vertical_nav hidden md:flex flex-col justify-start items-center h-[100vh] w-[162px] fixed top-0 left-0 z-50">
        <div className="flex flex-col pt-[20px] justify-start items-center">
          <img src={Logo} alt="logo" />
          <p className="hidden sm:block text-inherit text-logo">ALDÍA</p>
        </div>
        <NavbarContent className="flex flex-col items-start w-[100%]">
          {navLinks.map((link) => (
            <NavbarItem key={link.path} className="w-[100%]">
              <NavLink
                to={link.path}
                className={
                  location.pathname === link.path
                    ? "active item_menu"
                    : "inactive item_menu"
                }
              >
                <img src={link.icon} alt="" />
                {link.label}
              </NavLink>
            </NavbarItem>
          ))}
            <NavbarItem className="w-[100%]">
              <div className="inactive item_menu cursor-pointer" onClick={logout}>
                <img src={cancel} alt="" />
                Cerrar Sesión
              </div>
            </NavbarItem>
        </NavbarContent>
        <div className="h-[88px] pb-[20px] item_menu inactive"><img src={question} alt="question" /><p>Ayuda</p></div>
      </Navbar>


      <nav className="navBar_container pr-[20px] md:pr-[60px] pl-[20px] md:pl-[200px] w-[100%] h-[80px] flex justify-between items-center fixed">
        <div>
          <form >
            <input className="searh_input h-[35px] w-[100px] rounded-xl" type="text" placeholder="Buscar"/>
          </form>
        </div>
        <div className="flex justify-center items-center gap-[20px]">
          <img src={notificarion} alt="" />
          <Link to="/profile">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="warning"
              size="md"
              showFallback
              src={profilePhotoUrl}/>
          </Link>
          <div>
            <p className="nav_avatar_name font-semibold">{user.name + " " + user.lastName}</p>
            <p className="nav_avatar_ocupation">{user.occupation && user.occupation !== "null" ? user.occupation : ""}</p>
          </div>

        </div>


      </nav>



      <div className="nav_botton">
        <div className="nav_botton-container">
          <NavLink
            to="/"
            className={"nav_botton--item "+(location.pathname === "/" ? "active" : "inactive")}
          >
            <TbHome2 />
          </NavLink>
          <NavLink
            to="/informes"
            className={
              "nav_botton--item "+(location.pathname === "/informes" ? "active" : "inactive")
            }
          >
            <TbReportSearch />
          </NavLink>
          <NavLink
            to="/registro_financiero"
            className={
              "nav_botton--item "+(location.pathname === "/registro_financiero" ? "active" : "inactive")}
          >
            <HiOutlineDocumentAdd />
          </NavLink>
          <NavLink
            to="/historial"
            className={
              "nav_botton--item "+(location.pathname === "/historial" ? "active" : "inactive")
            }
          >
            <TbHistory />
          </NavLink>
          <NavLink
            to="/ayuda"
            className={"nav_botton--item "+(location.pathname === "/ayuda" ? "active" : "inactive")}
          >
            <TbHelp />
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default NavBar;
