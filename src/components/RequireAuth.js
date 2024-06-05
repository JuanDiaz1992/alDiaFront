import { useLocation, Navigate, Outlet } from "react-router-dom";


const RequireAuth = () => {
    const isLoggueding = localStorage.getItem("isLoggin");
    const location = useLocation();
    return (
        isLoggueding?
        <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;