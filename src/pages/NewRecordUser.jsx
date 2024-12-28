import "../styleheets/NewRecord.css";
import logo from "../img/logo_simple.webp";
import FirstForm from "../components/record_users_components/firstForm";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ComfirmCode from "../components/record_users_components/ComfirmCode";


function NewRecord() {
  const navigate = useNavigate();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selecNumbertPage]);
  return (
    <>
      <section className="section-new-user w-[100%] h-[100vh] flex justify-center items-center">
        <div className="form-container relative w-[90%] md:w-[70%] max-w-[400px] flex flex-col justify-start items-center bg-white pr-[20px] pl-[20px] pt-[45px] pb-[30px] rounded-lg ">
          <div className="w-[80px] h-[80px] bg-[#043249] rounded-[50%] flex items-center justify-center absolute top-[-45px]">
              <img className="w-[50px]" src={logo} alt="logo" />
          </div>
          <div className="flex gap-[5px] items-center absolute top-[10px] right-[20px]">
              <IoCloseCircleOutline className="text-[20px] text-[#3a0909]" onClick={()=>{navigate("/login")}}/>
          </div>
          {page}
        </div>
      </section>
    </>
  );
}

export default NewRecord;
