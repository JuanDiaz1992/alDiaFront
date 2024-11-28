import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import date from "../../Scripts/obtenerFechaActual";
import formatCompact from "../../Scripts/formatearPesos";
import Graphics from "./Graphics";
import fetchDataGet from "../../api/fetchDataGet";
import { HomeChangeContext } from "../../context/HomeContext"; 

function ViewForYear() {
  const { state }= useContext(HomeChangeContext)
  const actuallyYear = date().split("-")[0];
  const [yearSelected, setYearSelected] = useState(actuallyYear);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [haveData, setHaveData] = useState(true);
  const [loadin, setLoadin] = useState(true);


  const getData = async () => {
    if (parseInt(actuallyYear) === parseInt(yearSelected)) {
      setButtonEnable(false);
    } else {
      setButtonEnable(true);
    }
    try {
      const response = await fetchDataGet(`/api/v1/users/financial/allAmount/year/${yearSelected}`);
      setExpenses(0);
      setIncome(0);
      if (response) {
        if (response) {
          setHaveData(true);
          if (response.expenses > 0) {
            setExpenses(response.expenses);
          }
          if (response.income > 0) {
            setIncome(response.income);
          }
        } else {
          setHaveData(false);
        }
      }
    } catch (error) {
      setHaveData(false);
    }
    finally{
      setLoadin(false);
    }
  };

  const setMonthFuntion = (option) => {
    if (option) {
      setYearSelected(parseInt(yearSelected) + 1);
    } else {
      setYearSelected(parseInt(yearSelected) - 1);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearSelected, state]);


  return (
    <>
      <div className="month_buttons_container">
        <button onClick={() => setMonthFuntion(false)}>
          <IoIosArrowBack />
        </button>
        <div>
          <h2>{yearSelected}</h2>
        </div>
        {buttonEnable === true ? (
          <button
            className={buttonEnable === false ? "disable" : ""}
            onClick={() => setMonthFuntion(true)}
          >
            <IoIosArrowForward />
          </button>
        ) : (
          <button className={buttonEnable === false ? "disable" : ""}>
            <IoIosArrowForward />
          </button>
        )}
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
                    <p>Total gastos en este año:</p>
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
                    <p>Total ingresos en este año:</p>
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
              <h2>No hay registros en el año {yearSelected}</h2>
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
