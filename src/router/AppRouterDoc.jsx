import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import Error404 from "../pages/Error404Page";
import Home from "../pages/HomePage";
import Login from "../pages/Login";
import Admin from "../pages/AdminPage";
import NewRecord from "../pages/NewRecordUser";
import RegistroFinanciero from "../pages/Registro_financiero";
import HistoryFinancial from "../pages/HistoryFinancial";
import Profile from "../pages/Profile";
import RequireAuth from "../components/RequireAuth.jsx";
import PublicAuth from "../components/PublicAuth.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import RegisterMarriages from "../pages/RegisterMarriages.jsx";

function AppRouter() {
  const rol = localStorage.getItem("rol");
  const roles = ["ADMIN","USER"];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PublicAuth/>}>
              <Route path="/login" element={<Login />}/>
              <Route path="/newRecord" element={<NewRecord />} />
              <Route path="/reset-password/:token?" element={<ResetPassword />} />
            </Route>
            <Route path="*" element={<Error404 />} />
            <Route path="/adminPage" element={rol === roles[0] ? <Admin /> : <Navigate to="/Error404" replace />} />
            <Route element={<RequireAuth/>}>
              <Route path="/" element={<Home />} />
              <Route path="/registro_financiero" element={<RegistroFinanciero />}/>
              <Route path="/patrimonios" element={<RegisterMarriages/>}/>
              <Route path="/historial" element={<HistoryFinancial />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/Error404" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default AppRouter;