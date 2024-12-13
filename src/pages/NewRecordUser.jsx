import "../styleheets/NewRecord.css";
import logo from "../img/logo_simple.png";
import FirstForm from "../components/record_users_components/firstForm";


function NewRecord() {






  return (
    <>
      <section>
        <div className="logo_container">
          <div className="logo_container_div">
            <img className="logo_container_div_logo" src={logo} alt="logo" />
          </div>
          <div className="logo_container_p">
            <p>Registro</p>
          </div>
        </div>
        <FirstForm/>
      </section>
    </>
  );
}

export default NewRecord;
