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
    console.log(data);
    data.confirmCode = code;

    fetchDataPostPublic("/public/register", data)
      .then((data) => {
        if (parseInt(data.status) === 200) {
          toast.success(data.message);
          navigate("/");
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
      <form onSubmit={(e) => sendCode(e)} className="form_record">
        <h3>Confirmemos tu correo</h3>
        <div>
          <InputOtp
            classNames={{
              segmentWrapper: "gap-x-0",
              segment: [
                "relative",
                "h-10",
                "w-10",
                "border-y",
                "border-r",
                "first:rounded-l-md",
                "first:border-l",
                "last:rounded-r-md",
                "border-default-200",
                "data-[active=true]:border",
                "data-[active=true]:z-20",
                "data-[active=true]:ring-2",
                "data-[active=true]:ring-offset-2",
                "data-[active=true]:ring-offset-background",
                "data-[active=true]:ring-foreground",
              ],
            }}
            length={6}
            id="code"
            value={code}
            onValueChange={setCode}
            description="Ingresa los 6 dígitos que se enviaron a tu correo"
          />
        </div>

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
