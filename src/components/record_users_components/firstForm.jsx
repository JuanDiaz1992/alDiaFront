import { useEffect, useState }from "react";
import { Button, Input, Form } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import capitalizeFisrtLetter from "../../Scripts/upperCase";
import fetchDataPostPublic from "../../api/fetchDataPostPublic";

function FirstForm({setFinalData,setSelectPage}){
    const [name, setName] = useState("");
    const [firstLastName, setFirstLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasword, setConfirmPasword] = useState("");
    const [formState,setFormState] = useState(false);
    const [button_text,setStateButton] = useState("Envíar")


    const validateForm=()=>{
      if(name.length>2 && firstLastName.length>2 && email.length>10 && password.length>6 && confirmPasword.length>6){
        setFormState(true);
      }else{
        setFormState(false);
      }
    }
    useEffect(()=>{
      validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[name, firstLastName, email, password, confirmPasword]);

    const setForm = (e) => {
        e.preventDefault();
        if(formState){
          setStateButton("Enviando...");

          const request = {
            "name":name !==""? capitalizeFisrtLetter(name) : name,
            "lastName":firstLastName !==""? capitalizeFisrtLetter(firstLastName) : firstLastName,
            "surnamen": secondLastName !==""&& capitalizeFisrtLetter(secondLastName),
            "email":email,
            "password":password,
            "confirmPassword":confirmPasword,
          }
          fetchDataPostPublic("/public/emailvalidate",request)
          .then(data=>{
              if (parseInt(data.status)===200) {
                toast.success(data.message);
                setFinalData(request);
                setSelectPage(1);
              }else if(parseInt(data.status)===409){
                toast.error(data.message);
              }
          }).catch(()=>{
            toast.error("No hay conexión, intentelo de nuevo.");
          })
        }else{
          toast.error("Completa todos los campos");
          setStateButton("Envíar");
        }

      };
    return(
        <>
        <Form onSubmit={(e)=>setForm(e)} className="flex flex-col gap-[24px]">
            <Input
              color="warning"
              id="firstName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Nombres"
              errorMessage="Por favor ingrese un nombre valido"
            />
          <div className="flex gap-[24px]">
              <Input
                className="w-[48%]"
                color="warning"
                id="firstLastName"
                value={firstLastName}
                onChange={(e) => {
                  setFirstLastName(e.target.value);
                }}
                type="text"
                placeholder="Primer Apellido"
              />
              <Input
                className="w-[48%]"
                color="warning"
                id="secondLastName"
                value={secondLastName}
                onChange={(e) => {
                  setSecondLastName(e.target.value);
                }}
                type="text"
                placeholder="Segundo Apellido"
              />
            </div>
            <Input
              color="warning"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              errorMessage="Por favor ingrese un correo valido"
            />


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
              value={confirmPasword}
              onChange={(e) => {
                setConfirmPasword(e.target.value);
              }}
              placeholder="Confirme la contraseña"
            />

          <Button className="button_record_form" type="submit" color={formState?"primary":"default"}>{button_text}</Button>
          <p className="text-[12px]">*Si no posees segundo apellido, deja ese campo en blanco</p>
        </Form>
        </>
    )
}
export default FirstForm