import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInterceptor from "../customHooks/Interceptor";
function Layout() {
  const interceptor = useInterceptor();
  interceptor();
  let isLoggedIn = localStorage.getItem("isLoggin");
  return (
    <>
      {isLoggedIn && <NavBar />}
      <Outlet />
      {isLoggedIn && <Footer />}
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}
export default Layout;
