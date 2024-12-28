import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SendNewPassword from "../components/restore_password/SendNewPassword";
import SendMail from "../components/restore_password/SendMail";
import { Skeleton } from "@nextui-org/react";
import logo from "../img/logo_simple.webp";

function ResetPassword() {
  const { token } = useParams();
  const [page,setPage] = useState(
    <div className="flex flex-col gap-[24px] w-[100%]">
      <Skeleton className="flex rounded-lg w-[100%] h-[40px]" />
      <Skeleton className="flex rounded-lg w-[100%] h-[40px]" />
      <Skeleton className="flex rounded-lg w-[100px] h-[40px]" />
    </div>
  );

  useEffect(()=>{
    if(token && token.trim() !== "" && token.length ==8){
      setPage(<SendNewPassword token={token}/>);
    }else{
      setPage(<SendMail/>);
    }
  },[token])
  return (
    <>
      <section className="section-new-user w-[100%] h-[100vh] flex justify-center items-center">
        <div className="form-container relative w-[90%] md:w-[70%] max-w-[400px] flex flex-col justify-start items-center bg-white pr-[20px] pl-[20px] pt-[45px] pb-[30px] rounded-lg ">
          <div className="w-[80px] h-[80px] bg-[#043249] rounded-[50%] flex items-center justify-center absolute top-[-45px]">
            <img className="w-[50px]" src={logo} alt="logo" />
          </div>
          {page}
        </div>
      </section>
    </>
  );
}
export default ResetPassword;
