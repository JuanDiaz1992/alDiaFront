import AverageExpenses from "./AverageExpenses";
import HistoryFinancial from "./HistoryFinancial";
import { BsCashCoin, BsFillJournalBookmarkFill } from "react-icons/bs";
import { IoMdTrendingUp } from "react-icons/io";
import TotalBalance from "../components/total_balance/TotalBalance";
import "../styleheets/Home.css";
import { HomeChangeContext } from "../context/HomeContext";
import { useContext,useEffect } from "react";
function Home() {
  const {state, dispatch} = useContext(HomeChangeContext);
  const nameUser = localStorage.getItem("firstName");
  const widgets = [
      {
        "widget": TotalBalance,
        "type":1,
        "title":"Saldo Disponible",
        "icon": BsCashCoin
      },
      {
        "widget": AverageExpenses,
        "type":2,
        "title":"Promedio de ingresos y gastos",
        "icon":IoMdTrendingUp
      },
      {
        "widget": HistoryFinancial,
        "type":2,
        "title":"Detalle de ingresos y gastos",
        "icon":BsFillJournalBookmarkFill
      }
  ];
  useEffect(() => {
    if (state.isChange) {
      dispatch({ type: "RESET" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isChange]);



  return (
    <>
      <section className="home_container gap-[78px] pt-[80px] w-[100%]  flex flex-col md:pl-[162px]  pb-[20px] lg:pb-[20px] lg:min-h-[100vh] h-fit">


        <div className="pl-[20px] md:pl-[37px] flex flex-col gap-0">
          <h1 className="m-0">¡Hola {nameUser ? nameUser:""}!</h1>
          <p>Que tengas un buen día</p>
        </div>


        <div className="bg-[#F0F0F0] flex flex-col flex-wrap mq1200:flex-row justify-start items-start w-[100%] gap-x-[10px] lg:gap-x-[30px] gap-y-[70px] pl-[24px] pr-[24px] md:pr-[0] md:pl-[37px]">
          {widgets.map((item, index) =>(
            item["type"]==1?
              <>
                <div className="w-[100%]">
                  <div key={index} className="info_container bg-[#043249] mq1200:min-w-[400px] max-w-fit rounded-[10px] pt-[45px] pb-[45px] pl-[20px] pr-[20px]  relative">
                    <div className="flex flex-row items-center gap-[15px] w-[100%] absolute left-0 top-[-30px]">
                      <h2 className="  font-bold">{item.title}</h2><item.icon/>
                    </div>
                    <item.widget/>
                  </div>
                </div>
              </>
              :
              <>
                <div key={index} className="info_container w-[100%] mq1200:w-[48%] lg:max-w-[559px] h-[604px] rounded-[10px] pt-[45px] pb-[45px]  relative">
                  <div className="flex flex-row items-center gap-[15px] w-[100%] absolute left-0 top-[-30px]">
                      <h2 className="  font-bold">{item.title}</h2><item.icon/>
                  </div>
                  <item.widget/>
                </div>
              </>
            ))}
        </div>
      </section>
    </>
  );
}

export default Home;
