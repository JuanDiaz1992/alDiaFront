import React from "react";
import {HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import FatherComponent from '../pages/FatherComponent';
import Error404 from '../pages/Error404Page';
import Home from '../pages/HomePage'
import Login from '../pages/Login';
import Admin from '../pages/AdminPage';
import NewRecord from "../pages/NewRecordUser";
import RegistroFinanciero from "../pages/Registro_financiero";
import HistoryFinancial from "../pages/HistoryFinancial";
import Profile from "../pages/Profile"

function AppRouter(){

    const type_user = useSelector(state => state.data_aldia.type_user )

    return(
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<FatherComponent />}>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/newRecord" element={<NewRecord />} />
                        <Route path="*" element={<Error404 />}/>
                        <Route path="/Error404" element={<Error404 />}/>
                        {type_user === 1 ? (
                            <>
                                <Route path="/adminPage" element={ <Admin />}/>
                            </>
                            ) : (
                            <Route path='*' element={<Navigate to='/Error404' replace />} />
                        )}                        
                        {type_user>0? (
                            <>
                                <Route index element={<Home />}/>
                                <Route path="/registro_financiero" element={ <RegistroFinanciero />}/>
                                <Route path="/historial" element={ <HistoryFinancial />}/>
                                <Route path="/profile" element={ <Profile />}/>
                            </>
                            ) : (
                            <Route path='*' element={<Navigate to='/Error404' replace />} />
                        )}                
                    </Route>
                </Routes>
            </HashRouter>
        </>
    )
}
export default AppRouter
