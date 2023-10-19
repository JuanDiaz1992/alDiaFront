import { useState }from "react";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux"
function FirstForm({setSaveInfo}){
    const [firstName, setFirtsName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [firstLastName, setFirstLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasword, setConfirmPasword] = useState("");
    const url = useSelector((state) => state.auth.url);
    
    const setForm = (e) => {
        e.preventDefault();

        fetch(url,{
            method:"POST",
            mode:"cors",
            headers:{
                Module: "user",
            },    
            body:JSON.stringify({
                "firstName":firstName,
                "secondName":secondName,
                "firstLastName":firstLastName,
                "secondLastName":secondLastName,
                "email":email,
                "userName":userName,
                "password":password,
                "confirmPasword":confirmPasword,
                "newUser_request":true
            })

        })
        .then(response=>response.json())
        .then(data=>{
            if (data.status===200) {
                setSaveInfo([{
                    "firstName":firstName,
                    "secondName":secondName,
                    "firstLastName":firstLastName,
                    "secondLastName":secondLastName,
                    "email":email,
                    "userName":userName,
                    "password":password,
                    "confirmPasword":confirmPasword,
                    "newUser_request":true
                }])
            }else{
                console.log(data)
            }
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
              required
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
                required
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <Button className="button_record_form" type="submit">Siguiente</Button>
          <p className="info_record">*Si no posee segundo nombre o segundo apellido, deje esos campos en blanco</p>
        </form>
        </>
    )
}
export default FirstForm