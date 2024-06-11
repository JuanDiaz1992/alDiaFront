
import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import date from "../../Scripts/obtenerFechaActual";
import formatCompact from "../../Scripts/formatearPesos";
import Graphics from "./Graphics";
import fetchDataGet from "../../api/fetchDataGet";
import useLogout from "../../customHooks/logout";

function ViewForMonth() {

  const logout = useLogout();
  const dateFunction = date().split("-")
  const dateselected = dateFunction;
  const [month, setMonth] = useState(dateselected[1])
  const [year, setYear] = useState(dateselected[0])
  const [haveData,setHaveData] = useState(false)
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [loadin,setLoadin] = useState(true)
  const [buttonEnable, setButtonEnable] =useState(false);
  const mesesDelAnio = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  useEffect(() => {
      const getData= async () =>{
        let newMonth = month
        if(month<10){
          newMonth = month.toString().padStart(2, '0')
        }
        const montAndYear = `${year}-${newMonth}`;
        try {
          const response = await fetchDataGet(`/api/v1/users/financial/allAmount/month/${montAndYear}`)
          setExpenses(0);
          setIncome(0);
          if (response) {
            setHaveData(true)
            if (response.expenses>0) {
              setExpenses(response.expenses);
            }
            if (response.income>0) {
              setIncome(response.income);
            }
          }else{
            setHaveData(false)
          }
        } catch (error) {
          setHaveData(false)
        }
      }
      getData();
      setLoadin(false)
  }, [month, year, logout]);


  const setMonthFuntion = (option)=>{
    if (Number(month) === Number(dateFunction[1]) -1  &&  Number(year) === Number(dateFunction[0])) {
      setButtonEnable(false)
    }
    if (option) {
      if (Number(month) === Number(dateFunction[1])  &&  Number(year) === Number(dateFunction[0]) ) {
      }else if(Number(year) !== Number(dateFunction[0]) && Number(month) === 12 ){
        let newMonth = 1;
        setMonth(newMonth);
        let newYear =  Number(year) + 1;
        setYear(newYear)
      }else{
        let newMonth = Number(month) + 1;
        setMonth(newMonth);
      }
    }else{
      setButtonEnable(true)
      if (month === 1) {
        let newMonth = Number(month) + 11;
        let newYear =  Number(year) - 1;
        setMonth(newMonth);
        setYear(newYear)
      }else{
        let newMonth = Number(month) -1;
        setMonth(newMonth);
      }

    }
  }
  return (
    <>
      <div className="month_buttons_container">
        <button onClick={() => setMonthFuntion(false)}>
          <IoIosArrowBack />
        </button>
        <div>
          <h2>{mesesDelAnio[month - 1]}</h2>
          <h3>{year}</h3>
        </div>
        <button
          className={buttonEnable === false ? "disable" : ""}
          onClick={() => setMonthFuntion(true)}
        >
          <IoIosArrowForward />
        </button>
      </div>
      <div className="content_index--info_container">
        {loadin === true ? (
          <>
            {" "}
            <CircularProgress label="Cargando..." />
          </>
        ) : haveData === true ? (
          <>
            <div>
              <Graphics income={income} expenses={expenses} />
            </div>
            <div className="content_index--info_container--data_info">
              {expenses !== 0 ? (
                <>
                  <div className="content_index--info_container--data_info--div">
                    <div className="circle1"></div>
                    <p>Total gastos:</p>
                  </div>
                  <p>{formatCompact(expenses)}</p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="content_index--info_container--data_info">
              {income !== 0 ? (
                <>
                  <div className="content_index--info_container--data_info--div">
                    <div className="circle2"></div>
                    <p>Total ingresos:</p>
                  </div>
                  <p>{formatCompact(income)}</p>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="null_register">
              <h2>
                No hay registros para el mes de {mesesDelAnio[month - 1]} del{" "}
                {year}
              </h2>
              <p>
                Empieza a registrar tus gastos e ingresos{" "}
                <NavLink to="/registro_financiero">aquí</NavLink>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default ViewForMonth;
