import "../styleheets/Financial_record.css";
import RecordFinancial from "../components/Financial_record_components/FormRecord";


function RegistroFinanciero(){


    return(
        <>
        <div className="container_financial_record lg:h-[100vh]">
            <RecordFinancial />
        </div>
        </>
    );
}
export default RegistroFinanciero