import FormRecord from "./FormRecord"
import { Button } from "@nextui-org/react"
function RecordIncome({setOption}){
    return(
        <>
         
            <div>
                <h2 className="container_financial_record--h2">Registro Ingresos</h2>
            </div>
            <div className="form_container">
                <FormRecord tableGet="income_category" tablePost="income" setOption={setOption} descriptionLabel="Sueldo quincena" />
            </div>

        </>
    )
}
export default RecordIncome