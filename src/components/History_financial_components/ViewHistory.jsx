import formatCompact from "../../Scripts/formatearPesos";
import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowBack, IoIosClose  } from "react-icons/io";
import {CircularProgress , Modal, ModalContent, ModalBody, Image, useDisclosure} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast"
import date from "../../Scripts/obtenerFechaActual";
import getCookie from "../../Scripts/getCookies";
function ViewHistory({table, table_category}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const url = process.env.REACT_APP_URL_HOST;
    const userId = useSelector((state) => state.data_aldia.id_user);
    const dateFunction = date().split("-");
    const dateselected = dateFunction;
    const [month, setMonth] = useState(dateselected[1]);
    const [year, setYear] = useState(dateselected[0]);
    const [haveData, setHaveData] = useState(true);
    const [allData,setData] =useState([]);
    const [loadin, setLoadin] = useState(true);
    const [buttonEnable, setButtonEnable] = useState(false);
    const [deleteItemUpdate, setDeleteItemUpdate] = useState(false);
    const [imgSelected,setImgSelected] = useState("")
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
    useEffect(() => {
      let newMonth = month
      if(month<10){
        newMonth = month.toString().padStart(2, '0')
      }
      const montAndYear = `${year}-${newMonth}`;
      fetch(
        `${url}expensesAndIncome?linkTo=id_user&equalTo=${userId}&date=date&dateTo=${montAndYear}&tableSelected=${table}&category_selected=${table_category}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: "Token " + getCookie("token"),
            Module: "financial_record",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data["status"] === 200) {
            if (data["results"]) {
              setHaveData(true);
              setData(data["results"])
            }
          } else {
            setHaveData(false);
          }
          setLoadin(false);
          setDeleteItemUpdate(false)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, year,deleteItemUpdate]);
    const setMonthFuntion = (option) => {
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
    const deleteItem =  (idSelected,table)=>{
      confirmAlert({
        title: "Confirmación de eliminación",
        message: `¿Estás seguro que deseas eliminar este registro?`,
        buttons: [
          {
            label: "Sí",
            onClick: async () => {
            try {
              await fetch(url,{
                method:"DELETE",
                mode:"cors",
                headers:{
                  Authorization: "Token " + getCookie("token"),
                  Module: "financial_record",
                },
                body:JSON.stringify({
                  table:table,
                  id:idSelected,
                  deleteItem:true
                })
              })
              .then(response=>response.json())
              .then(data=>{
                if(data["status"]===200){
                  toast.success('Registro eliminado.')
                  setDeleteItemUpdate(true)
                }
              })
            } catch (error) {
              console.log(error)
            }
          },
        },
          {
            label: "No",
            onClick: () => {}, // No hace nada
          },
        ],
      });
    }
    const openImg=(img)=>{
      onOpen()
      setImgSelected(img)
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
              <CircularProgress aria-label="Loading..."/>
            </div>
          ) : haveData === true ? (
            <>
              <div className="record_info_container--container">
                {allData !== 0 ? (
                  <>
                    <motion.div
                    initial={ table=== "income"? { opacity: 0, x: 15 } : { opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="record_info_container">
                      {allData.map((data, index) => (
                        <div className="record_info" key={index}>
                          <div className={table === "income"? "circle1History":"circle2History"}></div>
                          <div className="record_info--info">
                            <p>Descipción: {data.description}</p>
                            <p>Categoría: {data.name_category}</p>
                            <p>Total: {formatCompact(data.amount)}</p>
                            <p>Fecha: {data.date}</p>
                            {data["photo"] &&
                              <Image onClick={()=>openImg(url + data["photo"])} isZoomed className="photo_mini" src={url + data["photo"]} alt="" />
                            }
                            <hr />
                          </div>
                          <IoIosClose onClick={()=>deleteItem(data["id"],table)}/>
                        </div>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <></>
                )}
              </div>
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
        backdrop="opaque"
        size="3xl"
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
          }
        }}
      >
      <ModalContent>
        <ModalBody>
          <img className="img_modal" src={imgSelected} alt="incomeOrExpensePicture" />
        </ModalBody>
      </ModalContent>
      </Modal>
    </>
  );
}

export default ViewHistory;