import "../styleheets/HomePage.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import date from "../Scripts/obtenerFechaActual";
import getCookie from "../Scripts/getCookies";
import formatCompact from "../Scripts/formatearPesos";
import Graphics from "../components/Home_components/Graphics";

function Home() {
  const url = useSelector((state) => state.data_aldia.url);
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
    const montAndYear = `${year}-${month}`;
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
        if (data["status"] === 200) {
        if (data["results"]) {
          setHaveData(true)
          for (let j = 0; j < data["results"].length; j++) {
            if (data["results"][j]["expenses"]) {
              let total = 0;
              for (let i = 0; i < data["results"][j]["expenses"].length; i++) {
                total += data["results"][j]["expenses"][i]["amount"];
              }
   
              // setExpenses(formatCompact(total));
              setExpenses(total);
            }
            if (data["results"][j]["income"]) {
              let total = 0;
              for (let i = 0; i < data["results"][j]["income"].length; i++) {
                total += data["results"][j]["income"][i]["amount"];
              }
              setIncome(total);
            }
          }
        }}else{
          setHaveData(false)
        }
        setLoadin(false)
      });

  }, [month,year]);
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
      <div className="content_index">
        <div className="month_buttons_container">
          <button onClick={()=>setMonthFuntion(false)}><IoIosArrowBack /></button>
          <div>
            <h2>{mesesDelAnio[month - 1 ]}</h2>
            <h3>{year}</h3>
          </div>
          <button className={buttonEnable === false ? "disable" : ""} onClick={()=>setMonthFuntion(true)}><IoIosArrowForward /></button>
        </div>
        <div className="content_index--info_container">
          {loadin === true?
          <> <CircularProgress label="Cargando..." /></>
          :
          haveData === true ? (
            <>
              <div>
                <Graphics income={income} expenses={expenses} />
              </div>
              <div className="content_index--info_container--data_info">
                {expenses !== 0 ? 
                <>
                  <div className="content_index--info_container--data_info--div">
                    <div className="circle1"></div>
                    <p>Total gastos:</p>
                  </div>
                  <p>{formatCompact(expenses)}</p>
                </> 
                  : <></>}
              </div>
              <div className="content_index--info_container--data_info">
              {income !== 0 ? 
                <>
                  <div className="content_index--info_container--data_info--div">
                    <div className="circle2"></div>
                    <p>Total ingresos:</p>
                  </div>
                  <p>{formatCompact(income)}</p>
                </> 
                  : <></>}
               </div>
            </>
          ) : (
            <>
              <div className="null_register">
                <h2>No hay registros para el mes de {mesesDelAnio[month - 1 ]} del {year}</h2>
                <p>Empieza a registrar tus gastos e ingresos <NavLink to="/registro_financiero">aquí</NavLink></p>
              </div>
            </>
          )
          }
        </div>
      </div>
    </>
  );
}

export default Home;
