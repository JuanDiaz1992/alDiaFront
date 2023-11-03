import "../../styleheets/Financial_record.css";
import { useEffect, useState } from "react";
import SelectOption from "../../components/Financial_record_components/SelectOption";
import RecordIncome from "../../components/Financial_record_components/RecordIncome";
import RecordExpenses from "../../components/Financial_record_components/RecordExpenses";


function RegistroFinanciero(){
    const [option, setOption] = useState()
    const [view,setView] = useState()
    useEffect(()=>{
        switch (option) {
            case 1:
                setView(<RecordIncome setOption={setOption} />)
                break;
            case 2:
                setView(<RecordExpenses setOption={setOption} />)
                break;    
            default:
                setView(<SelectOption setOption={setOption} />)
                break;
        }
    },[option])
    return(
        <>
        <div className="container_financial_record">
            {view}
        </div>
        </>
    );
}
export default RegistroFinanciero