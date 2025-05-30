import AverageExpenses from "./AverageExpenses";
import HistoryFinancial from "./HistoryFinancial";
import { BsCashCoin, BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";
import { IoDocumentAttachOutline } from "react-icons/io5";
import TotalBalance from "../components/total_balance/TotalBalance";
import "../styleheets/Home.css";
import { HomeChangeContext } from "../context/HomeContext";
import { useContext, useEffect } from "react";
import SimpleGetHeritages from "../components/Heritages/SimpleGetHeritages";
import DeclaracionRentaHome from "../components/Home_components/DeclaracionRentaHome";
function Home() {
  const { state, dispatch } = useContext(HomeChangeContext);
  const nameUser = localStorage.getItem("firstName");
  const widgets = [
    {
      widget: TotalBalance,
      type: 1,
      title: "Saldo Disponible",
      icon: BsCashCoin,
      background: "bg-[#043249]",
    },
    {
      widget: SimpleGetHeritages,
      type: 1,
      title: "Valor Total Patrimonios",
      icon: MdOutlineAddHomeWork,
    },
    {
      widget: DeclaracionRentaHome,
      type: 1,
      title: "Información Declaración Renta",
      icon: IoDocumentAttachOutline,
    },
    {
      widget: AverageExpenses,
      type: 2,
      title: "Promedio de ingresos y gastos",
      icon: IoMdTrendingUp,
    },
    {
      widget: HistoryFinancial,
      type: 2,
      title: "Detalle de ingresos y gastos",
      icon: BsFillJournalBookmarkFill,
    },
  ];
  useEffect(() => {
    if (state.isChange) {
      dispatch({ type: "RESET" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isChange]);

  return (
    <>
      <section className="home_container pt-[80px] w-[100%]  flex flex-col md:pl-[162px]  pb-[20px] lg:pb-[20px] lg:min-h-[100vh] h-fit">
        <div className="pl-5 md:pl-10 flex flex-col gap-0 mb-5">
          <h1 className=" m-0">¡Hola {nameUser ? nameUser : ""}!</h1>
          <p>Que tengas un buen día</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 mt-10 mb-20">
          {widgets
            .filter((item) => item.type === 1)
            .map((item, index) => (
              <div
                key={index}
                className={`info_container rounded-[10px] pt-[45px] pb-[45px] px-5 relative min-h-[260px] flex flex-col justify-center ${
                  item.background || "bg-white"
                }`}
              >
                <div className="flex flex-row items-center gap-3 absolute left-0 top-[-30px]">
                  <h2 className="font-bold">{item.title}</h2>
                  <item.icon />
                </div>
                <item.widget />
              </div>
            ))}
        </div>

        <div className="bg-[#F0F0F0] flex flex-col flex-wrap mq1200:flex-row justify-start items-start w-[100%] gap-x-[10px] lg:gap-x-[30px] gap-y-[70px] pl-[24px] pr-[24px] md:pr-[0] md:pl-[37px]">
          {widgets.map(
            (item, index) =>
              item["type"] != 1 && (
                <>
                  <div
                    key={index}
                    className="info_container w-[100%] mq1200:w-[48%] lg:max-w-[559px] h-[604px] rounded-[10px] pt-[45px] pb-[45px]  relative"
                  >
                    <div className="flex flex-row items-center gap-[15px] w-[100%] absolute left-0 top-[-30px]">
                      <h2 className="  font-bold">{item.title}</h2>
                      <item.icon />
                    </div>
                    <item.widget />
                  </div>
                </>
              )
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
