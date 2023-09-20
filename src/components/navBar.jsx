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
import "./styleheets/navBar.css";
import getCookie from "../Scripts/getCookies";
import setCookie from "../Scripts/borrarCookies";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { NavLink, useLocation } from "react-router-dom";

function NavBar(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { setIsLogout } = props;
  const url = useSelector((state) => state.auth.url);
  const firstName = useSelector((state) => state.auth.firtsName);
  const last_name = useSelector((state) => state.auth.last_name);
  const photo = useSelector((state) => state.auth.photo);
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
              <NavLink to="/" className={location.pathname === "/"? "active":"inactive"}>
                Inicio
              </NavLink>
            </NavbarItem>
            <NavbarItem>
                <NavLink to="/informes" className={location.pathname === "/informes"? "active":"inactive"}>
                    Informes
                </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to="/registrar_factura" className={location.pathname === "/registrar_factura"? "active":"inactive"}>
                Registrar Factura
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to="/historial" className={location.pathname === "/historial"? "active":"inactive"}>
                Historial
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to="/ayuda" className={location.pathname === "/ayuda"? "active":"inactive"}>
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
                src={url+photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem textValue="My Settings" className="h-14 gap-2">
                <p className="font-semibold">Logueado como</p>
                <p className="font-semibold">{firstName + ' ' + last_name}</p>
              </DropdownItem>
              <DropdownItem textValue="My Settings"></DropdownItem>
              <DropdownItem textValue="My Settings">Team Settings</DropdownItem>
              <DropdownItem textValue="My Settings">Analytics</DropdownItem>
              <DropdownItem textValue="My Settings">System</DropdownItem>
              <DropdownItem textValue="My Settings">
                Configurations
              </DropdownItem>
              <DropdownItem textValue="My Settings">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                textValue="My Settings"
                onClick={logOut}
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default NavBar;
