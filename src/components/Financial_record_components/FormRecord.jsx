import dateToday from "../../Scripts/obtenerFechaActual";
import { useEffect, useState, useRef } from "react";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import convertToBase64 from "../../Scripts/converToBase64";
import fetchDataPost from "../../api/fetchDataPost";
import changeNamePicture from "../../Scripts/changeNamePicture";
import fetchDataGet from "../../api/fetchDataGet";
import { IoMdClose, IoIosCloseCircle, IoMdCheckmarkCircleOutline  } from "react-icons/io";
import { isNumber } from "chart.js/helpers";
import FormFinancial from "../FormFinancial";

function FormRecord() {
  const today = dateToday();
  const [descriptionLabel, setDescriptionLabel] = useState("");
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryFromBd, setCategoryFromBd] = useState([]);
  const [category, setCategory] = useState(new Set([]));
  const [typeCategory, setType] = useState(new Set([]));
  const [isPlanned, setIsPlanned] = useState(false);
  const [file, setFile] = useState(null);
  const [fileFull, setFileFUll] = useState(null);
  const inputFileRef = useRef(null);
  const options = [
    {
      name: "Gastos",
      type: "expenses",
      descriptionLabel: "Pago del arriendo",
    },
    {
      name: "Ingresos",
      type: "incomes",
      descriptionLabel: "Sueldo quincena",
    },
  ];


  //Obtiene las categorias de gastos
  useEffect(() => {
    const getData = async () => {
      if (typeCategory["currentKey"]) {
        let table = options[typeCategory["currentKey"]]["type"];
        let response = await fetchDataGet(
          `/api/v1/users/financial/categories/${table}`
        );
        if (response) {
          if (table === "expenses") {
            setDescriptionLabel(options[0]["descriptionLabel"]);
          } else {
            setDescriptionLabel(options[1]["descriptionLabel"]);
          }
          setCategoryFromBd(response);
        }
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeCategory]);



  //Obtiene el total de la factura si es legible
  const getMetadataFromImg = async () => {
    let base64 = "";
    let result = await convertToBase64(fileFull);
    base64 = result.photo;
    let body = {
      img: base64,
    };
    let response = await fetchDataPost(`/api/v1/utils/getinfoimg`,body);
    if (response) {
      if(isNumber(response.total) && amount == "" ){
        setAmount(Number(response.total));
      }

    }
  };

  //Envío de formulario
  const sendInfo = async (e) => {
    e.preventDefault();
    let base64 = "";
    let table = options[typeCategory["currentKey"]]["type"];
    let categorySelected = categoryFromBd[category["currentKey"]];
    console.log(categorySelected);
    if (fileFull) {
      const tiempoActual = Date.now().toString();
      let photo = changeNamePicture(fileFull, `${tiempoActual}-${"s"}`);
      try {
        let result = await convertToBase64(photo);
        base64 = result.photo;
      } catch (error) {
        console.error("Error al convertir el archivo a base64:", error);
      }
    }
    let body = {
      picture: base64,
      date: date,
      amount: amount,
      description: description,
      is_planned:isPlanned
    };
    console.log(body)
    if (table === "expenses") {
      body.categoryExpenses = categorySelected;
    } else if (table === "incomes") {
      body.categoryIncomes = categorySelected;
    }
    const response = await fetchDataPost(`/api/v1/users/financial/${table}`, body);
    if (parseInt(response.status) === 200) {
      inputFileRef.current.value = null;
      setFile(null);
      setFileFUll(null);
      setDate(today);
      setAmount("");
      setDescription("");
      }
      toast((t) => (
        <span className="message_toas">
          {response.message? <div className="toas_message_ok"> <IoMdCheckmarkCircleOutline  />{response.message}</div> : <div className="toas_message_error"><IoIosCloseCircle /><> Ah ocurrido un error, intentelo de nuevo más tarde.</></div>}
          <Divider orientation="vertical" />
          <button onClick={() => toast.dismiss(t.id)}>
            <IoMdClose />
          </button>
        </span>
      ));
    }



  //Mostrar imagen temporalmente
  const manejarSeleccionImagen = (e) => {
    setFileFUll(e.target.files[0]);
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setFile(urlTemporal);
    }
  };


  useEffect(()=>{
    if(fileFull != null && amount == "" ){
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(fileFull.type)) {
        getMetadataFromImg();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fileFull])




  return (
    <>
      <div className="flex justify-center items-center w-[100%] max-w-[559px] h-[604px] rounded-[10px] pt-[45px] pb-[45px] pr-[20px] pl-[20px] relative bg-white">
        <div className="form_record_financial_container">
            <div className="input_new_record">
              <Select
                id="departament"
                label="Seleccione tipo de registro"
                onSelectionChange={setType}
                required
              >
                {options.map((category, index) => (
                  <SelectItem key={index} value={category["type"]}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className={typeCategory["size"] > 0 ? "" : "form_disabled"}>
            <div className="input_new_record">
                <Select
                  className="mb-[25px]"
                  id="departament"
                  label="Categoría"
                  onSelectionChange={setCategory}
                  placeholder="Seleccione una categoría"
                  required
                >
                  {categoryFromBd.map((category, index) => (
                    <SelectItem key={index} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <FormFinancial
                manejarSeleccionImagen ={manejarSeleccionImagen}
                sendInfo = {sendInfo}
                setCategory = {setCategory}
                category = {category}
                categoryFromBd ={categoryFromBd}
                inputFileRef={inputFileRef}
                date={date}
                setDate={setDate}
                today={today}
                amount={amount}
                setAmount={setAmount}
                description={description}
                setDescription ={setDescription}
                descriptionLabel={descriptionLabel}
                isPlanned={isPlanned}
                setIsPlanned={setIsPlanned}
              />
            </div>
        </div>
      </div>
      <div className={`${file ? "flex" : "hidden"} justify-center items-center w-[100%] max-w-[559px] h-fit md:h-[604px] rounded-[10px] pt-[45px] pb-[45px] relative bg-white`}>
        {file && <img src={file} alt="" className="object-cover w-[70%] rounded-lg" />}
      </div>
    </>
  );
}
export default FormRecord;
