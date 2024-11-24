import formatCompact from "../../Scripts/formatearPesos";
import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaEdit  } from "react-icons/fa";
import { MdDeleteOutline  } from "react-icons/md";
import {
  CircularProgress,
  Modal,
  ModalContent,
  ModalBody,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast";
import date from "../../Scripts/obtenerFechaActual";
import fetchDataGet from "../../api/fetchDataGet";
import fetchDataDelete from "../../api/fetchDataDelete";
import fetchDataImg from "../../Scripts/getPhoto";
import Paginator from "../paginator";
import EditHistory from "./EditHistory";


function ViewHistory({ table }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dateFunction = date().split("-");
  const dateselected = dateFunction;
  const [month, setMonth] = useState(dateselected[1]);
  const [year, setYear] = useState(dateselected[0]);
  const [haveData, setHaveData] = useState(true);
  const [allData, setData] = useState([]);
  const [loadin, setLoadin] = useState(true);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [deleteItemUpdate, setDeleteItemUpdate] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewModal,setModal] = useState([])
  const mesesDelAnio = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];




  //Obtiene la lista de los gatos e ingresos del mes o año
  const getData = async () => {
    let newMonth = month;
    if (month < 10) {
      newMonth = month.toString().padStart(2, "0");
    }
    const montAndYear = `${year}-${newMonth}`;
    try {
      const result = await fetchDataGet(
        `/api/v1/users/financial/${table}/month/${montAndYear}?page=${
          pageNumber - 1
        }&size=5`
      );
      if (result) {
        setHaveData(true);
        const data = result.content;
        for (let i = 0; i < data.length; i++) {
          if (data[i].picture !== null && data[i].picture !=="") {
            const response = await fetchDataImg(data[i].picture)
            data[i].picture = response;
          }
        }
        setData(data);
        setTotalPages(result.totalPages);
      } else {
        setHaveData(false);
      }
    } catch (error) {
      setHaveData(false);
    }
    setLoadin(false);
    setDeleteItemUpdate(false);
  };


  //Se encarga de formatear las fechas
  const setMonthFuntion = (option) => {
    setPageNumber(1);
    if (
      Number(month) === Number(dateFunction[1]) - 1 &&
      Number(year) === Number(dateFunction[0])
    ) {
      setButtonEnable(false);
    }
    if (option) {
      if (
        Number(month) === Number(dateFunction[1]) &&
        Number(year) === Number(dateFunction[0])
      ) {
        null;
      } else if (
        Number(year) !== Number(dateFunction[0]) &&
        Number(month) === 12
      ) {
        let newMonth = 1;
        setMonth(newMonth);
        let newYear = Number(year) + 1;
        setYear(newYear);
      } else {
        let newMonth = Number(month) + 1;
        setMonth(newMonth);
      }
    } else {
      setButtonEnable(true);
      if (month === 1) {
        let newMonth = Number(month) + 11;
        let newYear = Number(year) - 1;
        setMonth(newMonth);
        setYear(newYear);
      } else {
        let newMonth = Number(month) - 1;
        setMonth(newMonth);
      }
    }
  };


  //Elimina el ingreso o egreso solicitado
  const deleteItem = (idSelected, table) => {
    let idItem = table=="incomes"? idSelected.idIncome : idSelected.idExpense;
    confirmAlert({
      title: "Confirmación de eliminación",
      message: `¿Estás seguro que deseas eliminar este registro?`,
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              const result = await fetchDataDelete(`/api/v1/users/financial/${table}/delete/id/${idItem}`);
              if(result) {
                  toast.success(result.message);
                  setDeleteItemUpdate(true);
                }else{
                  toast.error(result.message);
                }
            } catch (error) {
              toast.error("Ah ocurrido un error, intentelo de nuevo más tarde.");
            }
          },
        },
        {
          label: "No",
          onClick: () => {}, // No hace nada
        },
      ],
    });
  };






  //Inicia el método getData
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, deleteItemUpdate, pageNumber]);

const openModa=(option, img, data, table)=>{
  onOpen();
  switch (option) {
    case 1:
      setModal(
      <img
        className="img_modal"
        src={img}
        alt="incomeOrExpensePicture"
      />)
      break;
    case 2:
      setModal(<EditHistory data={data} table={table} fromEdit={true}/>);
      break;
    default:
      break;
  }
}

  return (
    <>
      <div className="content_history">
        <div className="month_buttons_container_history">
          <button onClick={() => setMonthFuntion(false)}>
            <IoIosArrowBack />
          </button>
          <div>
            <h2>{mesesDelAnio[month - 1]}</h2>
            <h3>{year}</h3>
          </div>
          <button
            className={buttonEnable === false ? "disable" : ""}
            onClick={() => setMonthFuntion(true)}
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div
          className={
            "content_history--info_container " + (haveData ? "" : "center")
          }
        >
          {loadin === true ? (
            <div className="loading_container center">
              <CircularProgress aria-label="Loading..." />
            </div>
          ) : haveData === true ? (
            <>
              <div className="record_info_container--container">
                {allData.length !== 0 ? (
                  <>
                    <motion.div
                      initial={
                        table === "incomes"
                          ? { opacity: 0, x: 15 }
                          : { opacity: 0, x: -15 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      className="record_info_container"
                    >
                      {allData.map((data, index) => (
                        <div className="record_info" key={index}>
                          {table=="incomes"?
                          <FaArrowAltCircleUp className="text-[#ff7f3e] w-[25px]"/>
                          :<FaArrowAltCircleDown className="text-[#043249] w-[25px]"/>
                          }

                          <div className="record_info--info flex flex-row justify-between flex-wrap">
                            <div className="flex gap-[15px] flex-col">
                              <p><strong>Descipción:</strong> {data.description}</p>
                              <p><strong>Categoría:</strong> {data.category.name}</p>
                              <p><strong>Total:</strong> {formatCompact(data.amount)}</p>
                              <p><strong>Fecha:</strong> {data.date}</p>
                              {data.is_planned?<p className="text-[#ff7f3e]"><strong>Entra en el presupuesto</strong></p>:<></>}
                              <div className="flex">
                                <MdDeleteOutline  className="text-red-500 w-[30px] transform transition-transform duration-300 hover:scale-110"
                                  onClick={() => deleteItem(data, table)}
                                />
                                <FaEdit className="text-green-500 w-[25px] transform transition-transform duration-300 hover:scale-110"
                                  onClick={()=> openModa(2,"",data,table)}
                                />
                              </div>
                            </div>
                            {data.picture&&
                                    <Image
                                    isZoomed
                                    onClick={() => openModa(1,data.picture)}
                                    className="photo_mini"
                                    src={data.picture}
                                    alt="picture"
                                  />
                              }
                            <hr />
                          </div>

                        </div>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {totalPages > 1 && (
                <Paginator
                  totalPages={totalPages}
                  currentPage={pageNumber}
                  setCurrentPage={setPageNumber}
                />
              )}
            </>
          ) : (
            <>
              <div className="null_register">
                <h2>
                  No hay registros para el mes de {mesesDelAnio[month - 1]} del{" "}
                  {year}
                </h2>
                <p>
                  Empieza a registrar tus gastos e ingresos{" "}
                  <NavLink to="/registro_financiero">aquí</NavLink>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        className="flex justify-center items-center h-[80vh] w-fit pt-[25px] overflow-y-auto"
        backdrop="opaque"
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: -20,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 0,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          <ModalBody className="overflow-auto pt-[25px] pb-[45px]">
            {viewModal}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewHistory;
