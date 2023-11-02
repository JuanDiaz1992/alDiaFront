import { Card, CardBody } from "@nextui-org/react";
import income from "../../img/income.png";
import expenses from "../../img/expenses.png"
function SelectOption({setOption}){
    return(
        <>            
            <div>
                <h2 className="container_financial_record--h2">Registro Financiero</h2>
            </div>
            <div className="container_financial_record--div2">
                <Card isPressable onPress={() => setOption(1)}>
                    <CardBody className="overflow-visible p-0 card_container">
                    <img
                        alt="income"
                        className="object-cover"
                        src={income}
                        />
                    <h3>Registrar Ingresos</h3>
                    </CardBody>
                </Card>
                <Card isPressable onPress={() => setOption(2)}>
                    <CardBody className="overflow-visible p-0 card_container">
                    <img
                        alt="expenses"
                        className="object-cover"
                        src={expenses}
                        />
                    <h3>Registrar Egresos</h3>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
export default SelectOption