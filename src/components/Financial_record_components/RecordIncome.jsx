import FormRecord from "./FormRecord"
import { Button } from "@nextui-org/react"
function RecordIncome({setOption}){
    return(
        <>
         
            <div>
                <h2 className="container_financial_record--h2">Registro Ingresos</h2>
            </div>
            <div className="form_container">
                <FormRecord table="income_category" />

                <Button color="warning" onClick={setOption}>Go back</Button>
            </div>

        </>
    )
}
export default RecordIncome