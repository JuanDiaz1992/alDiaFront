import { Select, SelectItem, Button, Checkbox } from "@nextui-org/react";
import {useEffect, useState} from "react";
import { FaCamera } from "react-icons/fa";
import fetchDataGet from "../api/fetchDataGet";
import dateToday from "../Scripts/obtenerFechaActual";


function FormFinancial({ sendInfo }) {
  const today = dateToday();
  const [descriptionLabel, setDescriptionLabel] = useState("");
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryFromBd, setCategoryFromBd] = useState([]);
  const [category, setCategory] = useState(new Set([]));
  const [typeCategory, setType] = useState(new Set([]));
  const [isPlanned, setIsPlanned] = useState(false);
  const [formIsOk, setStateForm] = useState(false);
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

  return (
    <>
      <form
        className="formRecord flex flex-row flex-wrap justify-between "
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

        <div className="">
          <input
            type="file"
            id="file"
            accept="image/jpeg, image/png, image/jpg"
            capture="camera"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={manejarSeleccionImagen}
          />
          <Button
            radius="full"
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Take a photo"
            onClick={handleIconClick}
          >
            <FaCamera />
          </Button>
          <p className="text_info">
            Si tienes una fotografría del comprobante, subelo aquí
          </p>
        </div>

        <div className="input_new_record w-[46%]">
          <label htmlFor="date">Fecha</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today}
          />
        </div>
        <div className="input_new_record w-[46%]">
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

        <div className="w-[100%] flex gap-[px] items-center">
          <Checkbox
            color="success"
            value={isPlanned}
            onChange={(e) => setIsPlanned(e.target.checked)}
          >
            {" "}
          </Checkbox>
          <p className="text-[12px] mt-[5px]">
            Marca esta casilla para añadir este registro al presupuesto
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
    </>
  );
}
export default FormFinancial;
