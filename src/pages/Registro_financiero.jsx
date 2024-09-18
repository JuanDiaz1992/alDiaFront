import "../styleheets/Financial_record.css";
import RecordFinancial from "../components/Financial_record_components/FormRecord";


function RegistroFinanciero(){


    return(
        <>
            <div className="container_financial_record  flex flex-row flex-wrap justify-center items-center h-[fit-content] min-h-[100vh] bg-[#F0F0F0] md:pl-[162px] md:pr-[0]  pb-[20px] lg:pb-[20px] pl-[24px] pr-[24px]">
                <RecordFinancial />
            </div>
        </>
    );
}
export default RegistroFinanciero