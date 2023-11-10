import dateToday from "../../Scripts/obtenerFechaActual";
import { useEffect, useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import getCookie from "../../Scripts/getCookies";

function FormRecord() {
  const url = process.env.REACT_APP_URL_HOST;
  const userID = useSelector((state) => state.data_aldia.id_user);
  const today = dateToday();
  const [descriptionLabel, setDescriptionLabel] = useState("");
  const [tablePost, setTablePost] = useState("");
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryFromBd, setCategoryFromBd] = useState([]);
  const [category, setCategory] = useState(new Set([]));
  const [type, setType] = useState(new Set([]));
  const [formIsOk,setStateForm] = useState(false)
  const options = [
    {
      name: "Gastos",
      type: "expenses",
      table_category: "expenses_category",
      descriptionLabel: "Pago del arriendo",
    },
    {
      name: "Ingresos",
      type: "income",
      table_category: "income_category",
      descriptionLabel: "Sueldo quincena",
    },
  ];
  useEffect(() => {
    if (type["currentKey"]) {
      let table = options[type["currentKey"]]["table_category"];
      fetch(`${url}${table}/`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Token " + getCookie("token"),
          Module: "financial_record",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            if (options[type["currentKey"]]["type"] === "expenses") {
              setDescriptionLabel(options[0]["descriptionLabel"]);
              setTablePost("expenses");
            } else {
              setDescriptionLabel(options[1]["descriptionLabel"]);
              setTablePost("income");
            }
            setCategoryFromBd(data.results);
          }
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {

    if (amount.length>2 && date && category["size"] > 0 && description.length>3) {
      setStateForm(true)
    } else {
      setStateForm(false)
    }
  }, [amount, date, category, description]);

  const sendInfo = (e) => {
    e.preventDefault();
    if (amount && date && categoryFromBd[category["currentKey"]]["id"]) {
      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Token " + getCookie("token"),
          Module: "financial_record",
        },
        body: JSON.stringify({
          table: tablePost,
          id_user: userID,
          date: date,
          amount: amount,
          description: description,
          category: categoryFromBd[category["currentKey"]]["id"],
          record_income: true,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let icon = "";
          if (data.status === 200) {
            icon = "👏";
            setDate(today);
            setAmount("");
            setDescription("");
            setCategory(["$.0"]);
          } else {
            icon = "🚫";
          }
          toast(data.message, {
            duration: 3000,
            position: "bottom-right",
            icon: icon,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    }else{
      toast("Completa todo el formulario", {
        duration: 3000,
        position: "top",
        icon:  "🚫",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
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
                {category["name"]}
              </SelectItem>
            ))}
          </Select>
        </div>
        <form
          className={"formRecord " + (type["size"] > 0 ? "" : "form_disabled")}
          onSubmit={(e) => sendInfo(e)}
        >
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
          <div className="input_new_record">
            <Select
              id="departament"
              label="Categoría"
              onSelectionChange={setCategory}
              placeholder="Seleccione una categoría"
              required
            >
              {categoryFromBd.map((category, index) => (
                <SelectItem key={index} value={category["id"]}>
                  {category["name_category"]}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="buttons_container">
            <Button  color={formIsOk? "primary": "default"} className={formIsOk? "":"form_disabled"} type="submit">
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default FormRecord;
