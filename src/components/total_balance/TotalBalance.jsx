import { useContext, useEffect, useState } from "react";
import obtenerFechaActual from "../../Scripts/obtenerFechaActual";
import fetchDataGet from "../../api/fetchDataGet";
import { HomeChangeContext } from "../../context/HomeContext";
import formatCompact from "../../Scripts/formatearPesos";
function TotalBalance(){
    const { state } = useContext(HomeChangeContext);
    const [loading,setLoadin] = useState(true);
    const [monthBalance,setMonthBalance] = useState(0);
    const [yearBalance,setYearBalance] = useState(0);


    const getData= async ()=>{
        const date = obtenerFechaActual();
        const formattedDate = date.slice(0, 7);
        const year = date.slice(0,4)
        try {
            const response = await fetchDataGet(`/api/v1/users/financial/allAmount/month/${formattedDate}`);
            const responseyear = await fetchDataGet(`/api/v1/users/financial/allAmount/year/${year}`);
            if (response) {
                setMonthBalance(response.income - response.expenses);
            }
            if (responseyear){
                setYearBalance(responseyear.income - responseyear.expenses);
            }
        }catch (error) {
            setMonthBalance(0);
        }finally{
            setLoadin(false)
        }
    };

    useEffect(()=>{
        getData();        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state]);

    if(loading){
        return(
            <>
                <div>
                    Cargando...
                </div>
            </>
        )
    }else{
        return(
            <>
                <div>
                    <h2>Saldo Disponible</h2>
                    <p>Mes Actual: {formatCompact(monthBalance)}</p>
                    <p>Año Actual: {formatCompact(yearBalance)}</p>
                </div>
            </>
        )
    }

}
export default TotalBalance;