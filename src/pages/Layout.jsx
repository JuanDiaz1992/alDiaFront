import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
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
      <Toaster position="top-center" reverseOrder={true} toastOptions={{ limit: 5 }}/>
    </>
  );
}
export default Layout;
