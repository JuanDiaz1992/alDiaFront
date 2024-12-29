import { Form, Input, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import fetchDataPostPublic from "../../api/fetchDataPostPublic";
import { useNavigate } from "react-router-dom";
function SendNewPassword({token}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, setFormState] = useState(false);
  const [button_text, setStateButton] = useState("Envíar");
  const navigate = useNavigate();
  useEffect(() => {
    if (
      password.length > 6 &&
      confirmPassword.length > 6 &&
      password === confirmPassword
    ) {
      setFormState(true);
    } else {
      setFormState(false);
    }
  }, [password, confirmPassword]);

  const setForm = async (e) => {
    e.preventDefault();
    try{
      if (formState) {
        setStateButton("Enviando...");
        let response = await fetchDataPostPublic("/public/resetpassword",{
          "newPassword":confirmPassword,
          "token":token
        });
        if(response.status=="200"){
          toast.success(response.message);
          navigate("/login")
        }else{
          toast(response.message,{
            duration: 6000,
          });
        }
      } else {
        toast.error("Completa todos los campos");
      }
    }catch(error){
      toast.error("Ah ocurrido un error, intentelo de nuevo más tarde");
    }finally{
      setStateButton("Envíar");
    }
  };
  return(
    <Form onSubmit={(e) => setForm(e)} className="flex flex-col gap-[24px]">
    <Input
      color="warning"
      id="password"
      type="password"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      placeholder="Contraseña"
    />
    <Input
      color="warning"
      id="confirmPasword"
      type="password"
      value={confirmPassword}
      onChange={(e) => {
        setConfirmPassword(e.target.value);
      }}
      placeholder="Confirme la contraseña"
    />
    <Button
      className="button_record_form"
      type="submit"
      color={formState ? "primary" : "default"}
    >
      {button_text}
    </Button>
    <p className="text-[12px]">
      *Ingresa la nueva contraseña, recuerda usar números y letras
    </p>
  </Form>
  );
}
export default SendNewPassword;
