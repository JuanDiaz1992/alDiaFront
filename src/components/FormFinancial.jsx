import { Button, Checkbox } from "@nextui-org/react";
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
  fromEdit,
}) {
  const [amountInput, setAmountInput] = useState(amount);
  const [formIsOk, setStateForm] = useState(false);

  const formatNumber = (value) => {
    if (!value) return "";
    // Elimina todo lo que no sea número
    const numeric = value.replace(/\D/g, "");
    // Formatea con separador de miles
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    setAmountInput(formatNumber(rawValue));
    setAmount(rawValue); // Guarda el valor sin puntos en el estado original
  };

  const handleIconClick = () => {
    document.getElementById("file").click();
  };

  useEffect(() => {
    if (!amount) setAmountInput("");
  }, [amount]);

  // Validar datos antes del envío
  useEffect(() => {
    // category puede ser Set o Array, revisa según tu implementación
    const categoryOk =
      category && (category.size ? category.size > 0 : category.length > 0);
    if (
      Number(amount) > 0 &&
      date &&
      categoryOk &&
      description &&
      description.length > 3
    ) {
      setStateForm(true);
    } else {
      setStateForm(false);
    }
  }, [amount, date, category, description]);

  // Evita enviar si el formulario no es válido
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsOk) return;
    sendInfo(e);
  };

  return (
    <>
      <form
        className="formRecord flex flex-row flex-wrap justify-between gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center w-full mb-4">
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
          <p className="text_info text-xs text-gray-500 mt-2 text-center">
            Si tienes una fotografía del comprobante, súbela aquí
          </p>
        </div>

        <div className="input_new_record flex flex-col w-[46%] mb-2">
          <label htmlFor="date" className="mb-1 font-medium text-gray-700">
            Fecha
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-warning-400"
          />
        </div>
        <div className="input_new_record flex flex-col w-[46%] mb-2">
          <label htmlFor="amount" className="mb-1 font-medium text-gray-700">
            Monto
          </label>
          <input
            id="amount"
            value={amountInput}
            onChange={handleAmountChange}
            type="text"
            inputMode="numeric"
            placeholder="0.00 COP"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-warning-400"
          />
        </div>
        <div className="input_new_record flex flex-col w-full mb-2">
          <label
            htmlFor="description"
            className="mb-1 font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-warning-400"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder={descriptionLabel}
            rows={2}
          />
        </div>

        <div className="w-full flex items-center gap-2 mb-2">
          <Checkbox
            color="success"
            checked={isPlanned}
            onChange={(e) => setIsPlanned(e.target.checked)}
            className="mr-2"
          />
          <label className="text-[13px] text-gray-600">
            Marca esta casilla para añadir este registro al presupuesto
          </label>
        </div>

        <div className="buttons_container w-full flex justify-end">
          <Button
            color={formIsOk ? "primary" : "default"}
            className={formIsOk ? "" : "form_disabled"}
            type="submit"
            disabled={!formIsOk}
          >
            Registrar
          </Button>
        </div>
      </form>
    </>
  );
}

export default FormFinancial;