import { useNavigate } from "react-router-dom";
import fetchDataPostPublic from "../../api/fetchDataPostPublic";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { InputOtp, Button } from "@nextui-org/react";

function ComfirmCode({ finalData }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [formState, setFormState] = useState(false);

  const sendCode = (e) => {
    e.preventDefault();
    let data = finalData;
    data.confirmCode = code;
    fetchDataPostPublic("/public/register", data)
      .then((data) => {
        if (parseInt(data.status) === 200) {
          navigate("/");
          toast.success(data.message);
        } else if (parseInt(data.status) === 409) {
          toast.error(data.message);
        }
      })
      .catch(() => {
        toast.error("Ha ocurrido un error, intentalo de nuevo.");
      });
  };

  const validateForm = () => {
    if (code.toString().length === 6) { // Validar si el código tiene exactamente 6 caracteres
      setFormState(true);
    } else {
      setFormState(false);
    }
  };

  // Usamos useEffect para validar el formulario cuando el código cambia
  useEffect(() => {
    validateForm();
  }, [code]);

  return (
    <>
      <h3 className="pt-[70px] pb-[40px]">Confirmemos tu correo</h3>
      <form onSubmit={(e) => sendCode(e)} className="h-[100%]  flex flex-col gap-[24px] ">
        <div>
          <InputOtp
            length={6}
            id="code"
            value={code}
            onValueChange={setCode}
          />
        </div>
        <p className="text-[12px] text-[#464646]">Ingresa los 6 dígitos que se enviaron a tu correo</p>
        <Button
          className="button_record_form"
          type="submit"
          color={formState ? "primary" : "default"}
          disabled={!formState} // Deshabilitar el botón si formState es false
        >
          Siguiente
        </Button>
      </form>
    </>
  );
}
export default ComfirmCode;
