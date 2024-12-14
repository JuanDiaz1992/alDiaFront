import { useEffect, useState } from "react";
import { Button, Skeleton } from "@nextui-org/react";
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
        <div className="max-w-[300px] w-full flex flex-col items-start ">
          <Skeleton className="flex w-[70%] h-[17px] rounded-md"/><br/>
          <Skeleton className="flex w-[100%] h-[55px] rounded-md"/><br/>
          <Skeleton className="flex w-[70%] h-[17px] rounded-md"/><br/>
          <Skeleton className="flex w-[70%] h-[17px] rounded-md"/>
        </div>
      </>
    );
  } else {
    return (
      <>
      <div className="min-h-[160px]">
        {heritages != 0 ? (
          <>
            <p className="text-black text-[40px] font-bold mb-[20px]">{heritages}</p>
            <Button color="warning">Ver Detalles</Button>
          </>
        ) : (
          <>
            <p className="mb-[20px]">
              No hay registro de patrimonios, puedes registrarlos en el
              siguiente enlace
            </p>
            <Button color="warning">Patrimonios</Button>
          </>
        )}
        </div>
      </>
    );
  }
}
export default GetHeritages;
