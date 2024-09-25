import { Select, SelectItem, Button, Checkbox } from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";
import { useState, useEffect } from "react";

function FormFinancial({
  manejarSeleccionImagen,
  sendInfo,
  category,
  inputFileRef,
  date,
  setDate,
  today,
  amount,
  setAmount,
  description,
  setDescription,
  descriptionLabel,
  isPlanned,
  setIsPlanned,
  //Props del fomulario de edición
  fromEdit,

}) {
  const [formIsOk, setStateForm] = useState(false);
  const handleIconClick = () => {
    document.getElementById("file").click();
  };

  //Validar datos antes del envío
  useEffect(() => {
    if (
      amount > 0 &&
      date &&
      category["size"] > 0 &&
      description.length > 3
    ) {
      setStateForm(true);
    } else {
      setStateForm(false);
    }
  }, [amount, date, category, description]);



  return (
    <>
      <form
        className="formRecord flex flex-row flex-wrap justify-between "
        onSubmit={(e) => sendInfo(e)}
      >
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
