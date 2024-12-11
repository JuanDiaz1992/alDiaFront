import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import fetchGetData from "../../api/fetchDataGet";
import formatearPesos from "../../Scripts/formatearPesos";
function GetHeritages() {
  const [heritages, setHeritages] = useState(0);
  const [loading, setLoading] = useState(false);
  const getHeritagesApi = async () => {
    //const response = await fetchGetData(`/api/v1/users/heritages/getheritages?page=${0}&size=5`);
    try {
      const response = await fetchGetData(
        `/api/v1/users/heritages/gettotalheritages`
      );
      console.log(response)
      if (response.total > 0) {
        setHeritages(formatearPesos(response.total));
      }
    } catch (error) {
      setHeritages(0);
    } finally {
      setLoading(true);
    }
  };
  useEffect(() => {
    getHeritagesApi();
  }, []);
  if (!loading) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    return (
      <>
        {heritages != 0 ? (
          <div>
            <p className="text-black text-[40px] font-bold mb-[20px]">{heritages}</p>
            <Button color="warning">Ver Detalles</Button>
          </div>
        ) : (
          <div>
            <p className="mb-[20px]">
              No hay registro de patrimonios, puedes registrarlos en el
              siguiente enlace
            </p>
            <Button color="warning">Patrimonios</Button>
          </div>
        )}
      </>
    );
  }
}
export default GetHeritages;
