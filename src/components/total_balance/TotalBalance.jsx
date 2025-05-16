import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import obtenerFechaActual from "../../Scripts/obtenerFechaActual";
import fetchDataGet from "../../api/fetchDataGet";
import { HomeChangeContext } from "../../context/HomeContext";
import formatCompact from "../../Scripts/formatearPesos";

const TOPE_DECLARAR_RENTA = 63200000; // Tope aproximado en 2025 para ingresos

function TotalBalance() {
  const { state } = useContext(HomeChangeContext);
  const [loading, setLoadin] = useState(true);
  const [monthBalance, setMonthBalance] = useState(0);
  const [yearBalance, setYearBalance] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalAcumulado, setTotalAcumulado] = useState(0);
  const [totalIngresosEnElAnho, setTotalIngresosEnElAnho] = useState(0);

  const getData = async () => {
    const date = obtenerFechaActual();
    try {
      const response = await fetchDataGet(`/api/v1/users/financial/getbalance/${date}`);
      if (response) {
        setMonthBalance(response.balanceMounth);
        setYearBalance(response.balanceYear);
        setTotalIngresos(response.totalIngresos);
        setTotalGastos(response.totalGastos);
        setTotalAcumulado(response.totalAcoumaldo);
        setTotalIngresosEnElAnho(response.totalIngresosEnElAnho || 0); // importante validar
      }
    } catch (error) {
      setMonthBalance(0);
      setYearBalance(0);
      setTotalIngresos(0);
      setTotalGastos(0);
      setTotalAcumulado(0);
      setTotalIngresosEnElAnho(0);
    } finally {
      setLoadin(false);
    }
  };

  useEffect(() => {
    getData();
  }, [state]);

  const progresoDeclaracion = Math.min((totalIngresosEnElAnho / TOPE_DECLARAR_RENTA) * 100, 100).toFixed(0);

  if (loading) {
    return (
      <div className="max-w-[300px] w-full flex flex-col items-start gap-3">
        <Skeleton className="w-[70%] h-[17px] rounded-md" />
        <Skeleton className="w-full h-[55px] rounded-md" />
        <Skeleton className="w-[70%] h-[17px] rounded-md" />
        <Skeleton className="w-[70%] h-[17px] rounded-md" />
      </div>
    );
  }

  return (
    <div className="min-h-[220px] flex flex-col gap-2 text-white">
      <div className="mb-2">
        <p className="text-sm font-medium">Balance del mes</p>
        <p className="text-[40px] font-bold leading-tight">
          {monthBalance > 0 ? formatCompact(monthBalance) : "$0"}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium">Ahorro del año</p>
        <p className={`text-lg font-bold ${yearBalance < 0 ? "text-[#ff7f3e]" : ""}`}>
          {formatCompact(yearBalance)}
        </p>
      </div>

      <div className="mt-2">
        <p className="text-sm font-medium">Ingresos en el año</p>
        <p className="text-base font-bold">{formatCompact(totalIngresosEnElAnho)}</p>

        <div className="w-full bg-white/20 rounded-full h-2 mt-1">
          <div
            className="h-2 rounded-full bg-green-500"
            style={{ width: `${progresoDeclaracion}%` }}
          ></div>
        </div>
        <p className="text-xs mt-1">
          Has alcanzado el <span className="font-semibold">{progresoDeclaracion}%</span> del tope para declarar renta en el proxima año
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-1 text-sm">
        <p>
          <span className="font-semibold">Total ingresos:</span>{" "}
          <span className="font-bold">{formatCompact(totalIngresos)}</span>
        </p>
        <p>
          <span className="font-semibold">Total gastos:</span>{" "}
          <span className="font-bold">{formatCompact(totalGastos)}</span>
        </p>
        <p>
          <span className="font-semibold">Total acumulado:</span>{" "}
          <span className="font-bold">{formatCompact(totalAcumulado)}</span>
        </p>
      </div>

      {yearBalance < 0 && (
        <div className="p-2 bg-[#f3a33b] rounded-md border border-white mt-3 text-xs text-[#043249]">
          Tus gastos superan tus ingresos este año.
        </div>
      )}

      {yearBalance === 0 && totalIngresos === 0 && totalGastos === 0 && (
        <p className="text-sm mt-2">
          No se han registrado ingresos o gastos para este año aún.
        </p>
      )}
    </div>
  );
}

export default TotalBalance;
