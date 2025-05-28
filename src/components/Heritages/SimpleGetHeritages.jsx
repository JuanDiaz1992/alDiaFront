import { useEffect, useState } from "react";
import fetchGetData from "../../api/fetchDataGet";
import formatearPesos from "../../Scripts/formatearPesos";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function GetHeritages() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getHeritagesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchGetData(`/api/v1/users/heritages/gettotalheritages`);
      setData(response);
    } catch (err) {
      setError("No se pudieron cargar los patrimonios");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeritagesData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 w-full">
        <span className="text-gray-400">Cargando patrimonios...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 w-full">
        <p className="text-red-500 mb-4">{error}</p>
        <Button color="warning" onPress={getHeritagesData} className="font-bold">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!data || data.status !== 200) {
    return (
      <div className="flex flex-col items-center justify-center py-8 w-full">
        <p className="text-red-500 mb-4">No se pudieron cargar los patrimonios</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600">Valor total de tu patrimonio</h3>
        <p className="text-3xl font-bold text-[#043249]">
          {formatearPesos(data.total)}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">Tus patrimonios</h4>
        {data.heritages && data.heritages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-[#043249] text-white">DESCRIPCIÓN</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">VALOR</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">TIPO</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">FECHA ADQ.</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">PORCENTAJE</th>
                  <th className="px-4 py-2 bg-[#043249] text-white">UBICACIÓN</th>
                </tr>
              </thead>
              <tbody>
                {data.heritages.map((patrimonio) => (
                  <tr key={patrimonio.id} className="border-b">
                    <td className="px-4 py-2">{patrimonio.description || "Sin descripción"}</td>
                    <td className="px-4 py-2">{formatearPesos(patrimonio.value)}</td>
                    <td className="px-4 py-2">{patrimonio.type || "Sin tipo"}</td>
                    <td className="px-4 py-2">{patrimonio.acquisitionDate || "-"}</td>
                    <td className="px-4 py-2">{patrimonio.percentage ? `${patrimonio.percentage}%` : "-"}</td>
                    <td className="px-4 py-2">{patrimonio.location || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No se encontraron patrimonios registrados
          </p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button 
          color="warning" 
          onPress={() => navigate("/patrimonios")}
          className="font-bold"
        >
          Gestionar Patrimonios
        </Button>
      </div>
    </div>
  );
}

export default GetHeritages;