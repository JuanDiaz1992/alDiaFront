import { Button } from "@nextui-org/react"
import FormRecord from "./FormRecord"

function RecordExpenses({setOption}){
    return(
        <>
           <div>
                <h2 className="container_financial_record--h2">Registro Egresos</h2>
            </div>
            <div className="form_container">
            <FormRecord table ="expenses_category"/>
            <Button color="warning" onClick={setOption}>Go back</Button>
            </div>
        </>
    )
}
export default RecordExpenses