import { useEffect, useState, useContext } from "react";
import fetchGetData from "../../api/fetchDataGet";
import { Button } from "@nextui-org/react";
import formatearPesos from "../../Scripts/formatearPesos";
import { HomeChangeContext } from "../../context/HomeContext";
export default function DeclaracionRentaHome() {
  const { state } = useContext(HomeChangeContext);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getIsDeclaration = async () => {
      const response = await fetchGetData(
        "/api/v1/declaracion-renta/verificar-2025"
      );
      setInfo(response);
      setLoading(false);
    };
    getIsDeclaration();
  }, [state]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100px]">
        <span className="animate-pulse text-gray-400 text-lg">
          Cargando información...
        </span>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100px]">
        <span className="text-red-500">No se pudo obtener la información.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-3 items-center min-h-[120px]">
      <h2 className="text-xl font-bold text-[#043249] mb-2">
        Declaración de Renta 2025
      </h2>
      {info.debeDeclarar ? (
        <>
          <p className="text-green-600 font-semibold text-lg mb-2">
            ¡Debes declarar renta este año!
          </p>
          <Button color="warning" className="mt-2 font-bold">
            Generar declaración de renta
          </Button>
          <p className="text-xs text-gray-500 mt-2">{info.motivo}</p>
          <p>
            Tus Ingresos en el 2024 fueron de{" "}
            {formatearPesos(info.ingresosTotales2024)}
          </p>
        </>
      ) : (
        <>
          <p className="text-[#043249] font-semibold text-lg mb-2">
            No debes declarar renta este año.
          </p>
          <p className="text-xs text-gray-500">{info.motivo}</p>
        </>
      )}
    </div>
  );
}
