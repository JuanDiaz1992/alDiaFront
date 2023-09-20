import React from "react";
import {HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import FatherComponent from '../components/FatherComponent';
import Error404 from '../components/Error404Page';
import Home from '../components/principal_pages/HomePage'
import Login from '../components/principal_pages/Login';
import Admin from '../components/principal_pages/admin_pages/AdminPage';

function AppRouter(){

    const type_user = useSelector(state => state.auth.type_user )

    return(
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<FatherComponent />}>
                        <Route path="/login" element={<Login />}/>
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
                            <Route index element={<Home />}/>
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
