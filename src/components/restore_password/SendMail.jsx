import { Form, Input, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import fetchDataPostPublic from "../../api/fetchDataPostPublic";
function SendMail() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState(false);
  const [button_text, setStateButton] = useState("Envíar");
  const [message,setMessage] =useState("");
  const baseUrl = window.location.origin;
  useEffect(() => {
    if (email.length > 10) {
      setFormState(true);
    } else {
      setFormState(false);
    }
  }, [email]);

  const setForm = async (e) => {
    e.preventDefault();
    if (formState) {
      try {
        setStateButton("Enviando...");
        const response = await fetchDataPostPublic("/public/restorepassword",{
          "email":email,
          "host":baseUrl+"/"
        });
        if(response.status === "200"){
          setMessage(response.message);
        }else {
          toast.error(response.message || "Ocurrió un error inesperado");
        }
      } catch (error) {
        toast.error("Ocurrió un error inesperado");
      }finally{
        setStateButton("Envíar");
      }

    } else {
      toast.error("Completa todos los campos");
      setStateButton("Envíar");
    }
  };

    return(
      <>
      {message ? (
            <h3 className="text-center">{message}</h3>
          )
      :(
        <Form onSubmit={(e) => setForm(e)} className="flex flex-col gap-[24px] w-[100%]">
        <Input
          color="warning"
          label="Correo"
          placeholder="Ingresa tu correo"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          className="button_record_form"
          type="submit"
          color={formState ? "primary" : "default"}
        >
          {button_text}
        </Button>
      </Form>
      )}
      </>
    )
  }
export default SendMail;
