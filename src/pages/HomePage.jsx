import AverageExpenses from "./AverageExpenses";
import HistoryFinancial from "./HistoryFinancial";
import TotalBalance from "../components/total_balance/TotalBalance";
import "../styleheets/Home.css";
import { HomeChangeContext } from "../context/HomeContext";
import { useContext,useEffect } from "react";
function Home() {
  const {state, dispatch} = useContext(HomeChangeContext);
  const nameUser = localStorage.getItem("firstName");
  const widgets = [AverageExpenses,HistoryFinancial,TotalBalance];
  useEffect(() => {
    if (state.isChange) {
      dispatch({ type: "RESET" });
    }
  }, [state.isChange]);



  return (
    <>
      <section className="home_container gap-[78px] pt-[80px] w-[100%]  flex flex-col md:pl-[162px]  pb-[20px] lg:pb-[20px] lg:min-h-[100vh] h-fit">


        <div className="pl-[20px] md:pl-[37px] flex flex-col gap-0">
          <h1 className="m-0">¡Hola {nameUser ? nameUser:""}!</h1>
          <p>Que tengas un buen día</p>
        </div>


        <div className="bg-[#F0F0F0] flex flex-col flex-wrap mq1200:flex-row justify-start items-center w-[100%] gap-x-[10px] lg:gap-x-[30px] gap-y-[70px] pl-[24px] pr-[24px] md:pr-[0] md:pl-[37px]">
          {widgets.map((Widget, index) =>(
              <div key={index} className="info_container w-[100%] mq1200:w-[48%] lg:max-w-[559px] h-[604px] rounded-[10px] pt-[45px] pb-[45px]  relative">
                <h2 className="absolute left-0 top-[-30px] font-bold">Detalle de ingresos y gastos</h2>
                <Widget/>
              </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
