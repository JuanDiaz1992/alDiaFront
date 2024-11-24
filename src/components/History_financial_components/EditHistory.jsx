import FormFinancial from "../FormFinancial";
import { useState, useEffect } from "react";
import fetchDataGet from "../../api/fetchDataGet";
import convertToBase64 from "../../Scripts/converToBase64";
import fetchDataPost from "../../api/fetchDataPost";
import fetchDataPut from "../../api/fetchDataPut";
import { isNumber } from "chart.js/helpers";
import changeNamePicture from "../../Scripts/changeNamePicture";
import { toast } from "react-hot-toast";
import { IoMdClose, IoIosCloseCircle, IoMdCheckmarkCircleOutline  } from "react-icons/io";
import { Divider } from "@nextui-org/react";

function EditHistory({data,table}) {
  const [date, setDate] = useState(data.date);
  const [amount, setAmount] = useState(data.amount);
  const [description, setDescription] = useState(data.description);
  const [descriptionLabel, setDescriptionLabel] = useState("");
  const [category, setCategory] = useState(data.category.idCategory);
  const [file, setFile] = useState(data.picture);
  const [categoryFromBd, setCategoryFromBd] = useState([]);
  const [isPlanned, setIsPlanned] = useState(data.is_planned);
  const [fileFull, setFileFUll] = useState(null);

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

//Mostrar las categorías
useEffect(() => {
  const getData = async () => {
      let response = await fetchDataGet(
        `/api/v1/users/financial/categories/${table}`
      );
      if (response) {
        if (table === "expenses" && data.description!="" ) {
          setDescriptionLabel(options[0]["descriptionLabel"]);
        } else {
          setDescriptionLabel(options[1]["descriptionLabel"]);
        }
        setCategoryFromBd(response);
      }
    }
  getData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [table]);

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
useEffect(()=>{
  if(fileFull != null && amount == "" ){
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (validImageTypes.includes(fileFull.type)) {
      getMetadataFromImg();
    }
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[fileFull])


//Mostrar imagen temporalmente
const manejarSeleccionImagen = (e) => {
  setFileFUll(e.target.files[0]);
  const archivo = e.target.files[0];
  if (archivo) {
    const urlTemporal = URL.createObjectURL(archivo);
    setFile(urlTemporal);
  }
};

//Envío de formulario
const sendInfo = async (e) => {
  e.preventDefault();
  let base64 = "";
  let categorySelected = categoryFromBd[category-1];
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

  let id = table=="expenses"?data.idExpense:data.idIncome;
  let body = {
    id:id,
    picture: base64,
    date: date,
    amount: amount,
    description: description,
    is_planned:isPlanned
  };
  if (table === "expenses") {
    body.categoryExpenses = categorySelected;
  } else if (table === "incomes") {
    body.categoryIncomes = categorySelected;
  }

  const response = await fetchDataPut(`/api/v1/users/financial/${table}/edit/`, body);
  if (parseInt(response.status) === 200) {
    console.log(response);
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


  return <>
    <div className="flex justify-center mb-[25px]">
      <h2><strong>Editar Registro</strong></h2>
    </div>
    <label htmlFor="category" className="mb-[-10px]">Categoría</label>
    <div className="w-[100%] h-[45px] bg-[#F4F4F5] flex justify-center rounded-xl">
      <select
        id="category"
        className="w-[95%] h-[45px] bg-[#F4F4F5]"
        value={category} // Usamos el idCategory del objeto data.category
        onChange={(e) => setCategory(e.target.value)} // Captura el valor seleccionado
      >
        {categoryFromBd.map((categoryItem, index) => (
          <option key={index} value={categoryItem.idCategory}>
            {categoryItem.name}
          </option>
        ))}
      </select>
    </div>
    <FormFinancial
      fromEdit={true}
      sendInfo = {sendInfo}
      manejarSeleccionImagen={manejarSeleccionImagen}
      setDate={setDate}
      date={date}
      setAmount={setAmount}
      amount={amount}
      setDescription={setDescription}
      description={description}
      descriptionLabel={descriptionLabel}
      category={category}
      categoryFromEdit={data.category.idCategory}
      setIsPlanned={setIsPlanned}
      isPlanned={isPlanned}
    />
    <div className={`${file ? "flex" : "hidden"} justify-center items-center w-[100%] max-w-[559px] h-fit md:h-[604px] rounded-[10px] pt-[45px] pb-[45px] relative bg-white`}>
      {file && <img src={file} alt="" className="object-cover w-[70%] rounded-lg" />}
    </div>
  </>;
}

export default EditHistory;
