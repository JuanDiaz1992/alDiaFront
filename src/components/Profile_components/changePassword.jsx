import { ModalContent, ModalHeader, ModalBody, Input, Button } from "@nextui-org/react";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import fetchDataPut from "../../api/fetchDataPut";
import useLogout  from "../../customHooks/logout";
function ChangePassword({ onOpenChange }) {
  const [isVisible, setIsVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [formState, setFormState] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const logout = useLogout();
  const validateForm=()=>{
    if(newPassword.length>6 && confirmNewPassword.length>6 && newPassword === confirmNewPassword){
      setFormState(true);
    }else{
      setFormState(false);
    }
  }
  useEffect(()=>{
    validateForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newPassword,confirmNewPassword]);

  const sendNewPassword= async ()=>{
    if(formState){
      try{
        let body={
          newPassword:newPassword
        };
        const response = await fetchDataPut("/api/v1/users/profile/edit/password",body);
        console.log(response);
        if(response.status=="200"){
          toast.success(response.message)
          onOpenChange();
          setTimeout(() => {
            logout()
          }, 1000);
          toast("Tu sesión se cerrará. Por favor, inicia sesión nuevamente.",
            {
              duration: 6000,
            }
          );
        }
      }catch(e){
        toast.error(e.response.data.message);
      }
    }
  }
  return (
    <>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3>Cambio Contraseña</h3>
        </ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-[24px] pb-[40px]">
          <Input
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            value={newPassword}
            className="w-[100%]"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Contraseña"
            placeholder="Ingresa tu nueva contraseña"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            value={confirmNewPassword}
            className="w-[100%]"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            label="Confirmar Contraseña"
            placeholder="Confirma la contraseña"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Button color={formState? "success":"default"} onPress={sendNewPassword}>Envíar</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </>
  );
}
export default ChangePassword;
