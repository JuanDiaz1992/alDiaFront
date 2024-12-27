import "../styleheets/NewRecord.css";
import logo from "../img/logo_simple.png";
import FirstForm from "../components/record_users_components/firstForm";
import { useEffect, useState } from "react";
import ComfirmCode from "../components/record_users_components/ComfirmCode";

function NewRecord() {
  const [page,setPage] = useState();
  const [selecNumbertPage,setSelectPage] = useState(0);
  const [finalData, setFinalData] = useState([]);
  const selectPage=()=>{
    switch (selecNumbertPage) {
      case 0:
        setPage(
        <FirstForm
          setSelectPage = {setSelectPage}
          setFinalData = {setFinalData}
          />
        );
        break;
      case 1:
        setPage(
        <ComfirmCode
          setSelectPage = {setSelectPage}
          finalData = {finalData}
            />
          );
          break;
    }
  };
  useEffect(()=>{
    selectPage()
  },[selecNumbertPage]);
  return (
    <>
      <section>
        <div className="logo_container">
          <div className="logo_container_div">
            <img className="logo_container_div_logo" src={logo} alt="logo" />
          </div>
          <div className="logo_container_p">
            <p>Registro</p>
          </div>
        </div>
        {page}
      </section>
    </>
  );
}

export default NewRecord;
