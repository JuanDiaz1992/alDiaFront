
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import date from "../../Scripts/obtenerFechaActual";
import getCookie from "../../Scripts/getCookies";
import formatCompact from "../../Scripts/formatearPesos";
import Graphics from "./Graphics";

function ViewForMonth() {
  const url = process.env.REACT_APP_URL_HOST;
  const userId = useSelector((state) => state.data_aldia.id_user);
  const dateFunction = date().split("-") 
  const dateselected = dateFunction;
  const [month, setMonth] = useState(dateselected[1])
  const [year, setYear] = useState(dateselected[0])
  const [haveData,setHaveData] = useState(false)
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  const [loadin,setLoadin] = useState(true)
  const [buttonEnable, setButtonEnable] =useState(false)
  const mesesDelAnio = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  
  useEffect(() => {
    let newMonth = month
    if(month<10){
      newMonth = month.toString().padStart(2, '0')
    }
    const montAndYear = `${year}-${newMonth}`;
    fetch(
      `${url}setStateFinancial?linkTo=id_user&equalTo=${userId}&date=date&dateTo=${montAndYear}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Token " + getCookie("token"),
          Module: "financial_record",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setExpenses(0);
        setIncome(0);
        if (data["status"] === 200) {
        if (data["results"]) {
          setHaveData(true)
          for (let j = 0; j < data["results"].length; j++) {
            if (data["results"][j]["expenses"]) {
              let total = 0;
              for (let i = 0; i < data["results"][j]["expenses"].length; i++) {
                total += parseInt(data["results"][j]["expenses"][i]["amount"]);
              }
              setExpenses(total);
            }
            if (data["results"][j]["income"]) {
              let total = 0;
              for (let i = 0; i < data["results"][j]["income"].length; i++) {
                total += parseInt(data["results"][j]["income"][i]["amount"]);
              }
              setIncome(total);
            }

          }
        }}else{
          setHaveData(false)
        }
        setLoadin(false)
      });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);
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
