import dateToday from "../../Scripts/obtenerFechaActual";
import { useEffect, useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import convertToBase64 from "../../Scripts/converToBase64";
import fetchDataPost from "../../api/fetchDataPost";
import changeNamePicture from "../../Scripts/changeNamePicture";
import fetchDataGet from "../../api/fetchDataGet";
function FormRecord() {
  const today = dateToday();
  const [descriptionLabel, setDescriptionLabel] = useState("");
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryFromBd, setCategoryFromBd] = useState([]);
  const [category, setCategory] = useState(new Set([]));
  const [typeCategory, setType] = useState(new Set([]));
  const [formIsOk, setStateForm] = useState(false);
  const [file, setFile] = useState(null);
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


  //Validar datos antes del envío
  useEffect(() => {
    if (
      amount.length > 2 &&
      date &&
      category["size"] > 0 &&
      description.length > 3
    ) {
      setStateForm(true);
    } else {
      setStateForm(false);
    }
  }, [amount, date, category, description]);


  //Envío de formulario
  const sendInfo = async (e) => {
    e.preventDefault();
    let base64 = "";
    let table = options[typeCategory["currentKey"]]["type"];
    let categorySelected = categoryFromBd[category["currentKey"]];
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
    };
    if (table === "expenses") {
      body.categoryExpenses = categorySelected;
    } else if (table === "incomes") {
      body.categoryIncomes = categorySelected;
    }
    const response = await fetchDataPost(`/api/v1/users/financial/${table}`, body);
    if (parseInt(response.status) === 200) {
      setFile(null);
      setFileFUll(null);
      setDate(today);
      setAmount("");
      setDescription("");
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };


  //Mostrar imagen temporalmente
  const manejarSeleccionImagen = (e) => {
    setFileFUll(e.target.files[0]);
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setFile(urlTemporal);
    }
  };

  return (
    <>
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
        <form
          className={
            "formRecord " + (typeCategory["size"] > 0 ? "" : "form_disabled")
          }
          onSubmit={(e) => sendInfo(e)}
        >
          <div className="input_new_record">
            <Select
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
          <div className="input_new_record">
            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={today}
            />
          </div>
          <div className="input_new_record">
            <label htmlFor="amount">Monto</label>
            <input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="0.00 COP"
            />
          </div>
          <div className="input_new_record">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder={descriptionLabel}
            />
          </div>
          <div className="">
            {file && <img src={file} alt="" />}
            <label htmlFor="file">Comprobante</label>
            <input id="file" onChange={manejarSeleccionImagen} type="file" />
            <p className="text_info">
              Si tienes una fotografría del comprobante, subelo aquí
            </p>
          </div>
          <div className="buttons_container">
            <Button
              color={formIsOk ? "primary" : "default"}
              className={formIsOk ? "" : "form_disabled"}
              type="submit"
            >
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default FormRecord;
