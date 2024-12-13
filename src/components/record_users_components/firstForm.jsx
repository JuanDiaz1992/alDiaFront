import { useEffect, useState }from "react";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import capitalizeFisrtLetter from "../../Scripts/upperCase";
import fetchDataPostPublic from "../../api/fetchDataPostPublic";
import { useNavigate } from "react-router-dom";
function FirstForm(){
    const [name, setName] = useState("");
    const [firstLastName, setFirstLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasword, setConfirmPasword] = useState("");
    const [formState,setFormState] = useState(false);
    const navigate = useNavigate();

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
        const request = {
          "name":name !==""? capitalizeFisrtLetter(name) : name,
          "lastName":firstLastName !==""? capitalizeFisrtLetter(firstLastName) : firstLastName,
          "surnamen": secondLastName !==""&& capitalizeFisrtLetter(secondLastName),
          "email":email,
          "password":password,
          "confirmPassword":confirmPasword,
        }
        fetchDataPostPublic("/public/register",request)
        .then(data=>{
            if (parseInt(data.status)===200) {
              toast.success(data.message);
              navigate("/");
            }else if(parseInt(data.status)===409){
              toast.error(data.message);
            }
        }).catch(()=>{
          toast.error("No hay conexión, intentelo de nuevo.");
        })

      };
    return(
        <>
        <form onSubmit={(e)=>setForm(e)} className="form_record">
          <div className="names_container">
            <div className="input_new_record">
            <label htmlFor="firstName">Nombres</label>
            <input
              id="firstName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="María Camila"
            />
            </div>
          </div>
          <div className="names_container">
            <div className="input_new_record">
              <label htmlFor="firstLastName">Primer Apellido</label>
              <input
                id="firstLastName"
                value={firstLastName}
                onChange={(e) => {
                  setFirstLastName(e.target.value);
                }}
                type="text"
                placeholder="Marín"
              />
            </div>
            <div className="input_new_record">
              <label htmlFor="secondLastName">Segundo Apellido</label>
              <input
                id="secondLastName"
                value={secondLastName}
                onChange={(e) => {
                  setSecondLastName(e.target.value);
                }}
                type="text"
                placeholder="Castellanos"
              />
            </div>
          </div>
          <div className="input_new_record">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="correo@correo.com"
            />
          </div>
          <div className="input_new_record">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="********"
            />
          </div>
          <div className="input_new_record  ">
            <label htmlFor="confirmPasword">Confirme la contraseña</label>
            <input
              id="confirmPasword"
              type="password"
              value={confirmPasword}
              onChange={(e) => {
                setConfirmPasword(e.target.value);
              }}
              placeholder="********"
            />
          </div>
          <Button className="button_record_form" type="submit" color={formState?"primary":"default"}>Siguiente</Button>
          <p className="info_record">*Si no posee segundo nombre o segundo apellido, deje esos campos en blanco</p>
        </form>
        </>
    )
}
export default FirstForm