
import FormRecord from "./FormRecord";

function RecordExpenses({ setOption }) {
  return (
    <>
      <div>
        <h2 className="container_financial_record--h2">Registro Egresos</h2>
      </div>
      <div className="form_container">
        <FormRecord tableGet="expenses_category" tablePost="expenses" setOption={setOption} descriptionLabel="Pago del arriendo" />
      </div>
    </>
  );
}
export default RecordExpenses;
