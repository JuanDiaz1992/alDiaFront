import { useState }from "react";
import { Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import capitalizeFisrtLetter from "../../Scripts/upperCase";
import fetchDataPostPublic from "../../api/fetchDataPostPublic";
function FirstForm({setSaveInfo, setSelectOption}){
    const [firstName, setFirtsName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [firstLastName, setFirstLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasword, setConfirmPasword] = useState("");




    const setForm = (e) => {
        e.preventDefault();
        console.log(firstName);
        console.log(firstLastName);
        const newUser = {
          "firstName":firstName !==""? capitalizeFisrtLetter(firstName) : firstName,
          "middleName":secondName !==""? capitalizeFisrtLetter(secondName) : secondName,
          "lastName":firstLastName !==""? capitalizeFisrtLetter(firstLastName) : firstLastName,
          "surnamen": secondLastName !==""? capitalizeFisrtLetter(secondLastName) : secondName,
          "email":email,
          "username":userName,
          "password":password,
          "confirmPassword":confirmPasword,
        }
        fetchDataPostPublic("/public/validate",newUser)
        .then(data=>{
            if (parseInt(data.status)===200) {
                setSaveInfo(newUser);
                setSelectOption(1);
                toast.success(data.message);
            }else if(parseInt(data.status)===409){
              toast.error(data.message);
            }
        }).catch(error=>{
          toast.error(error.message);
        })

      };
    return(
        <>
        <form onSubmit={(e)=>setForm(e)} className="form_record">
          <div className="names_container">
            <div className="input_new_record">
            <label htmlFor="firstName">Primer Nombre</label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirtsName(e.target.value);
              }}
              type="text"
              placeholder="Tatiana"
            />
            </div>
            <div className="input_new_record">
              <label htmlFor="secondName">Segundo Nombre</label>
              <input
                id="secondName"
                value={secondName}
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
                type="text"
                placeholder="Andrea"
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
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              placeholder="tatiana2015"
              
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
          <Button className="button_record_form" type="submit">Siguiente</Button>
          <p className="info_record">*Si no posee segundo nombre o segundo apellido, deje esos campos en blanco</p>
        </form>

        </>
    )
}
export default FirstForm