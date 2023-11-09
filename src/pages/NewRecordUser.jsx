import { useState, useEffect } from "react";

import "../styleheets/NewRecord.css";
import logo from "../img/logo_simple.png";
import FirstForm from "../components/record_users_components/firstForm";
import SecondForm from "../components/record_users_components/secondForm";

function NewRecord() {
  const [saveInfo, setSaveInfo] = useState([]);
  const [selectOption, setSelectOption] = useState(0);
  const [viewForm, setViewForm] = useState("");

  const menu = () => {
    switch (selectOption) {
      case 0:
        setViewForm(
          <FirstForm
            setSaveInfo={setSaveInfo}
            setSelectOption={setSelectOption}
          />
        );
        break;
      case 1:
        setViewForm(<SecondForm saveInfo={saveInfo} />);
        break;
      default:
        setViewForm(
          <FirstForm
            setSaveInfo={setSaveInfo}
            setSelectOption={setSelectOption}
          />
        );
        break;
    }
  };
  useEffect(() => {
    menu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveInfo]);

  return (
    <>
      <section>
        <div className="logo_container">
          <div className="logo_container_div">
            <img className="logo_container_div_logo" src={logo} alt="logo" />
          </div>
          <div className="logo_container_p">
            {saveInfo.length === 1 ? (
              <p>Hola {saveInfo[0]["firstName"]}</p>
            ) : (
              <p>Registro</p>
            )}
          </div>
        </div>
        {viewForm}
      </section>
    </>
  );
}

export default NewRecord;
