import "../styleheets/HomePage.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import date from "../Scripts/obtenerFechaActual";
import getCookie from "../Scripts/getCookies";
function Home(){
    const url = useSelector((state)=>state.data_aldia.url);
    const userId= useSelector((state)=>state.data_aldia.id_user);
    const newDate = date().split("-");
    const montAndYear = `${newDate[0]}-${newDate[1]}`
    useEffect(()=>{
        fetch(`${url}setStateFinancial?linkTo=id_user&equalTo=${userId}&date=date&dateTo=${montAndYear}`,{
            method:"GET",
            mode:"cors",
            headers:{
                Authorization: "Token " + getCookie("token"),
                Module: "financial_record"
            }
        })
        .then(response =>response.json())
        .then(data=>{
            console.log(data)
        })
    })
    return(
        <>
            <div className="content_index">
                Home
            </div>
        </>
    )
}

export default Home