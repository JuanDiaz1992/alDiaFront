import { useEffect, useState, useContext } from "react";
import fetchGetData from "../../api/fetchDataGet";
import { Button, Spinner } from "@nextui-org/react";
import { HomeChangeContext } from "../../context/HomeContext";
import { HiOutlineCurrencyDollar, HiOutlineHome, HiOutlineCheckCircle } from "react-icons/hi2";

export default function DeclaracionRentaHome() {
  const { state } = useContext(HomeChangeContext);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    const getIsDeclaration = async () => {
      try {
        const response = await fetchGetData(
          "/api/v1/declaracion-renta/verificar-2025"
        );
        setInfo(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getIsDeclaration();
  }, [state]);

const handleGenerarDeclaracion = async () => {
    if (!info?.debeDeclarar) return;
    
    setGeneratingPDF(true);
    try {
        const response = await fetchGetData('/api/v1/declaracion-renta/generar-declaracion');
        
        if (!response.success) {
            throw new Error(response.error || "Error al generar el PDF");
        }

        // Decodificar el PDF desde Base64
        const byteCharacters = atob(response.data.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'application/pdf'});

        // Descargar el PDF
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.data.filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

    } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Error al generar la declaración");
    } finally {
        setGeneratingPDF(false);
    }
};

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

  // Extraer información estructurada
  const motivos = info.motivos || {};
  const motivoIngresos = motivos.ingresos || {};
  const motivoPatrimonio = motivos.patrimonio || {};

  return (
    <div className="flex flex-col justify-center gap-4 items-center transition-all duration-300">
      <h2 className="text-2xl font-extrabold text-[#043249] mb-1 tracking-tight flex items-center gap-2">
        <HiOutlineCheckCircle className="w-7 h-7 text-[#f59e42]" />
        Declaración de Renta 2025
      </h2>
      {info.debeDeclarar ? (
        <>
          <p className="text-green-700 font-bold text-lg mb-2 flex items-center gap-2">
            <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />
            ¡Debes declarar renta este año!
          </p>
          <div className="w-full space-y-4">
            {/* Sección de Ingresos */}
            <div className={`p-4 rounded-xl border transition-all duration-200 ${motivoIngresos.supera ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                <HiOutlineCurrencyDollar className="w-5 h-5 text-blue-400" />
                Ingresos Anuales 2024
              </h3>
              <p className="text-base font-mono mt-1">
                <span className="font-bold">{info.ingresosTotales2024}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span>{info.topes?.ingresosAnuales}</span>
              </p>
              <p className={`text-sm mt-2 ${motivoIngresos.supera ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                {motivoIngresos.mensaje}
              </p>
            </div>

            {/* Sección de Patrimonio */}
            <div className={`p-4 rounded-xl border transition-all duration-200 ${motivoPatrimonio.supera ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                <HiOutlineHome className="w-5 h-5 text-yellow-400" />
                Patrimonio Total
              </h3>
              <p className="text-base font-mono mt-1">
                <span className="font-bold">{info.patrimonioTotal}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span>{info.topes?.patrimonio}</span>
              </p>
              <p className={`text-sm mt-2 ${motivoPatrimonio.supera ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                {motivoPatrimonio.mensaje}
              </p>
            </div>
          </div>
          <Button 
            color="warning" 
            className="mt-6 font-bold w-full shadow-md hover:scale-[1.02] transition-transform"
            onClick={handleGenerarDeclaracion}
            disabled={generatingPDF}
          >
            {generatingPDF ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="white" />
                Generando...
              </div>
            ) : (
              'Generar declaración de renta'
            )}
          </Button>
        </>
      ) : (
        <>
          <p className="text-[#043249] font-bold text-lg mb-2 flex items-center gap-2">
            <HiOutlineCheckCircle className="w-5 h-5 text-blue-400" />
            No debes declarar renta este año.
          </p>
          <div className="w-full space-y-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                <HiOutlineCurrencyDollar className="w-5 h-5 text-blue-400" />
                Ingresos Anuales 2024
              </h3>
              <p className="text-base font-mono mt-1">
                <span className="font-bold">{info.ingresosTotales2024}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span>{info.topes?.ingresosAnuales}</span>
              </p>
              <p className="text-sm mt-2 text-gray-600">
                {motivoIngresos.mensaje || "No supera el tope mínimo"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                <HiOutlineHome className="w-5 h-5 text-yellow-400" />
                Patrimonio Total
              </h3>
              <p className="text-base font-mono mt-1">
                <span className="font-bold">{info.patrimonioTotal}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span>{info.topes?.patrimonio}</span>
              </p>
              <p className="text-sm mt-2 text-gray-600">
                {motivoPatrimonio.mensaje || "No supera el tope mínimo"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}