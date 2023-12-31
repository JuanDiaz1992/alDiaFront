import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import Logo from "../img/logoNavBar.png";
import "../styleheets/navBar.css";
import getCookie from "../Scripts/getCookies";
import setCookie from "../Scripts/borrarCookies";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { NavLink, useLocation } from "react-router-dom";
import dafaultPhotoUser from "../img/default_user.png";
import { TbReportSearch, TbHome2, TbHistory, TbHelp } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi"

function NavBar(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { setIsLogout } = props;
  const url = process.env.REACT_APP_URL_HOST;
  const firstName = useSelector((state) => state.data_aldia.firtsName);
  const last_name = useSelector((state) => state.data_aldia.last_name);
  const photo = useSelector((state) => state.data_aldia.photo);
  const logOut = () => {
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: "Token " + getCookie("token"),
        Module: "user",
      },
      body: JSON.stringify({
        logout_request: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCookie("loggedIn", false);
        setIsLogout(false);
        dispatch(logout());
      });
  };

  return (
    <>
      <Navbar isBordered className="navBar_container">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-12">
            <img src={Logo} alt="logo" />
            <p className="hidden sm:block text-inherit text-logo">ALDÍA</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3 ml-12">
            <NavbarItem>
              <NavLink
                to="/"
                className={location.pathname === "/" ? "active" : "inactive"}
              >
                Inicio
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/informes"
                className={
                  location.pathname === "/informes" ? "active" : "inactive"
                }
              >
                Informes
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/registro_financiero"
                className={
                  location.pathname === "/registro_financiero"
                    ? "active"
                    : "inactive"
                }
              >
                Registro Financiero
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/historial"
                className={
                  location.pathname === "/historial" ? "active" : "inactive"
                }
              >
                Historial
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/ayuda"
                className={
                  location.pathname === "/ayuda" ? "active" : "inactive"
                }
              >
                Ayuda
              </NavLink>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="warning"
                size="md"
                src={photo === null ? dafaultPhotoUser : url + photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem textValue="My Settings" className="h-14 gap-2">
                <p className="font-semibold">{firstName + " " + last_name}</p>
              </DropdownItem>
              <DropdownItem textValue="My Settings">
                <NavLink to="/profile" >
                  Mi perfil
                </NavLink>
              </DropdownItem>
              <DropdownItem textValue="My Settings">
                Configuraciones
              </DropdownItem>
              <DropdownItem
                textValue="My Settings"
                onClick={logOut}
                color="danger"
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

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
