import AverageExpenses from "./AverageExpenses";
import HistoryFinancial from "./HistoryFinancial";
import "../styleheets/Home.css"
function Home() {
  const nameUser = localStorage.getItem("firstName");
  return (
    <>
      <section className="home_container gap-[78px] pt-[80px] w-[100%]  flex flex-col md:pl-[162px]  pb-[20px] lg:pb-[20px] lg:h-[100vh]">


        <div className="pl-[20px] md:pl-[37px] flex flex-col gap-0">
          <h1 className="m-0">¡Hola {nameUser ? nameUser:""}!</h1>
          <p>Que tengas un buen día</p>
        </div>


        <div className="flex justify-start items-center flex-wrap w-[100%] gap-[10px] lg:gap-[30px] pl-[20px] md:pl-[37px]">
          <div className="info_container w-[100%] max-w-[559px] h-[604px] rounded-[10px] pt-[45px] pb-[45px] relative">
            <h2 className="absolute left-0 top-[-30px] font-bold">Promedio de ingresos y gastos</h2>
            <AverageExpenses/>
          </div>
          <div className="info_container w-[100%] max-w-[559px] h-[604px] rounded-[10px] pt-[45px] pb-[45px]  relative">
            <h2 className="absolute left-0 top-[-30px] font-bold">Detalle de ingresos y gastos</h2>
            <div className="overflow-hidden h-[500px]">
              <HistoryFinancial/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
