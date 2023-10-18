import { useState, useEffect } from "react";

import "../styleheets/NewRecord.css"
import logo from "../img/logo_simple.png";
import FirstForm from "../components/record_components/FirstForm";

function NewRecord() {

  const [saveInfo,setSaveInfo] = useState({});
  const [viewForm,setViewForm] = useState("")

  const menu=()=>{

    switch (saveInfo) {
      case saveInfo.length === 0:
        setViewForm(
            <FirstForm
            setSaveInfo={setSaveInfo}
          />
        )
        break;
      case saveInfo.length>0:
            <p>Registro ok</p>
          break;
      default:
        setViewForm(
          <FirstForm
          setSaveInfo={setSaveInfo}
        />
      )
        break;
    }
  }
  useEffect(()=>{
    menu()
  },[saveInfo])

  

    
  return (
    <>
      <section>
        <div className="logo_container">
          <div className="logo_container_div">
            <img className="logo_container_div_logo" src={logo} alt="logo" />
          </div>
          <p className="logo_container_p">Registro</p>
        </div>
        {viewForm}
      </section>
    </>
  );
}

export default NewRecord;
