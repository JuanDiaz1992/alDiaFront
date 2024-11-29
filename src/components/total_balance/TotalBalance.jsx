import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import obtenerFechaActual from "../../Scripts/obtenerFechaActual";
import fetchDataGet from "../../api/fetchDataGet";
import { HomeChangeContext } from "../../context/HomeContext";
import formatCompact from "../../Scripts/formatearPesos";
function TotalBalance() {
  const { state } = useContext(HomeChangeContext);
  const [loading, setLoadin] = useState(true);
  const [monthBalance, setMonthBalance] = useState(0);
  const [yearBalance, setYearBalance] = useState(0);

  const getData = async () => {
    const date = obtenerFechaActual();
    try {
      const response = await fetchDataGet(
        `/api/v1/users/financial/getbalance/${date}`
      );
      if (response) {
        setMonthBalance(response.balanceMounth);
        setYearBalance(response.balanceYear);
      }
    } catch (error) {
      setMonthBalance(0);
    } finally {
      setLoadin(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (loading) {
    return (
      <div className="max-w-[300px] w-full flex flex-col items-start ">
        <Skeleton className="flex w-[70%] h-[17px] rounded-md"/><br/>
        <Skeleton className="flex w-[100%] h-[55px] rounded-md"/><br/>
        <Skeleton className="flex w-[70%] h-[17px] rounded-md"/><br/>
        <Skeleton className="flex w-[70%] h-[17px] rounded-md"/>
      </div>
    );
  } else {
    return (
      <>
        <div>
          {yearBalance != 0 ? (
            <>
              <p className="text-white">
                <strong>
                  Mes Actual:
                  <br />
                </strong>{" "}
                <span className="text-[60px] font-bold">
                  {monthBalance > 0 ? formatCompact(monthBalance) : "$0"}
                </span>
              </p>
              <br />
              <p className="text-white">
                <strong>Ahorro Año Actual: </strong><br/><br/>
                {yearBalance >= 0 ? (
                  <span>{formatCompact(yearBalance)}</span>
                ) : (
                  <>
                    <span className="text-[#ff7f3e] font-bold">
                      {formatCompact(yearBalance)}
                    </span>
                    <br />
                    <br />
                    <div className="p-[10px] bg-[#f3a33b] rounded-md border border-[#ffff]">
                      {" "}
                      Tus gastos superan tus ingresos este año
                    </div>
                  </>
                )}
              </p>
            </>
          ) : (
            <p className="text-white">
              No se han registrado ingresos o gastos para este año aún.
            </p>
          )}
        </div>
      </>
    );
  }
}
export default TotalBalance;
