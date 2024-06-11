import { useLocation, Navigate, Outlet } from "react-router-dom";


const PublicAuth = () => {
    const isLoggueding = localStorage.getItem("isLoggin");
    const location = useLocation();
    return (
        !isLoggueding?
        <Outlet />
        : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default PublicAuth;