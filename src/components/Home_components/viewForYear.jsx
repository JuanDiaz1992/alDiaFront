import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import date from "../../Scripts/obtenerFechaActual";
import getCookie from "../../Scripts/getCookies";
import formatCompact from "../../Scripts/formatearPesos";
import Graphics from "./Graphics";

function ViewForYear() {
  const url = process.env.REACT_APP_URL_HOST;
  const userId = useSelector((state) => state.data_aldia.id_user);
  const actuallyYear = date().split("-")[0];
  const [yearSelected, setYearSelected] = useState(actuallyYear);
  const [buttonEnable,setButtonEnable] = useState(false)
  const [expenses,setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [haveData,setHaveData] = useState(false)
  const [loadin,setLoadin] = useState(true)
  useEffect(() => {
    if (parseInt(actuallyYear) === parseInt(yearSelected) ) {
      setButtonEnable(false)
    }else{
      setButtonEnable(true)
    }
    fetch(
      `${url}setStateFinancial?linkTo=id_user&equalTo=${userId}&date=date&dateTo=${yearSelected}`,
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
          if (data["status"]===200) {
            setHaveData(true);
            for(let i = 0; i < data["results"].length;i++){
              if(data["results"][i]["expenses"]){
                let total = 0;
                for (let j = 0; j < data["results"][i]["expenses"].length; j++) {
                  total += parseInt(data["results"][i]["expenses"][j]["amount"]);
                }
                   setExpenses(total);
              }            
              if (data["results"][i]["income"]) {
                let total = 0;
                for (let j = 0; j < data["results"][i]["income"].length; j++) {
                  total += parseInt(data["results"][i]["income"][j]["amount"]);
                }
                setIncome(total);
              }
            }
          }else{
            setHaveData(false)
          }
          setLoadin(false)
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearSelected]);
  const setMonthFuntion = (option)=>{
   if (option) {
      setYearSelected(parseInt(yearSelected)+1)
    }else{
      setYearSelected(parseInt(yearSelected)-1)
    }

  }
  return (
    <>
      <div className="month_buttons_container">
        <button onClick={() => setMonthFuntion(false)}>
          <IoIosArrowBack />
        </button>
        <div>
          <h2>{yearSelected}</h2>
        </div>
        {buttonEnable === true? 
          <button
          className={buttonEnable === false ? "disable" : ""}
          onClick={() => setMonthFuntion(true)}
        >
          <IoIosArrowForward />
        </button>
          :
          <button
          className={buttonEnable === false ? "disable" : ""}>
          <IoIosArrowForward />
        </button>
        }

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
                No hay registros en el año {yearSelected}
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
export default ViewForYear;
