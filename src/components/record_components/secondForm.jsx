import { Button, Select, SelectItem, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import dateToday from "../../Scripts/obtenerFechaActual";
function SecondForm({ saveInfo }) {

  const documents = [
    {
      name: "Cédula de ciudadanía",
      id: 1,
    },
    {
      name: "Cédula de extranjería",
      id: 3,
    },
    {
      name: "Tarjeta de extranjería",
      id: 4,
    },
    {
      name: "Pasaporte",
      id: 5,
    },
  ];

  //Este bloque de código le resta 18 años a la fecha actual
  const today = dateToday();
  const year = today.split("-")[0] - 18;
  const maxDate = `${year}-${today.split("-")[1]}-${today.split("-")[2]}`;
  /**********************************************************************/


  /*Los siguientes 3 estados obtienen la información de departamentos
  y municipios de Colombia, se usa para filtrar el seleccionado */
  const [departmentsAndCities, setDepartmentsAndCities] = useState([]);
  const [departament, setDepartamet] = useState([]);
  const [cities, setCities] = useState([]);
  

  /*Estos estados contienen la información del formulario*/
  const [typeDocument, setTypeDocument] = useState(null);
  const [document, setDocument] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [departamentSelect, setDepartametSelect] = useState("");
  const [citiSelecte, setCitiSelecte] = useState("");
  const [occupation,setOccupation]= useState("");
  const [dataPolitic,setDataPolitic] = useState(false);



  const setForm = (e) => {
    e.preventDefault();
    if (typeDocument !== null) {
      console.log(documents[typeDocument]["id"]);
    }
    console.log(departament[departamentSelect])
    console.log(cities[citiSelecte])
    
  };



  /*Esta función hace un fetch de datos con la información actualizada de departamentos y municipios en Colombia*/
  useEffect(() => {
    fetch("https://www.datos.gov.co/resource/95qx-tzs7.json")
      .then((response) => response.json())
      .then((data) => {
        setDepartmentsAndCities(data);
        const newArray = [
          ...new Set(data.map((departament) => departament.departamento)),
        ];
        setDepartamet(newArray);
      });
  }, []);

  //Este bloque de código toma el departamento seleccionado y muestra los municipios que pertenecen a él
  const filterCities = () => {
    const filterDepartments = departmentsAndCities.filter(
      (departamentFilter) =>
        departamentFilter.departamento === departament[departamentSelect]
    );
    const newArray = [
      ...new Set(filterDepartments.map((cities) => cities.municipio)),
    ];
    setCities(newArray);
  };
  useEffect(() => {
    filterCities(departamentSelect);
  }, [departamentSelect]);
  /**************************************************************************/


  return (
    <>
      <form onSubmit={(e) => setForm(e)} className="form_record">
        <div className="input_new_record">
          <h2>
            La siguiente información es crucial para que "AlDía" pueda elaborar
            su declaración de renta de manera precisa y completa.
          </h2>
        </div>

        <div className="input_new_record">
          <label htmlFor="type_document">Tipo documento</label>
          <Select
            id="type_document"
            onChange={(e) => setTypeDocument(e.target.value)}
            label="Seleccione el tipo de documento"
            required
          >
            {documents.map((document_set, index) => (
              <SelectItem key={index} value={document_set.id}>
                {document_set.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="input_new_record">
          <label htmlFor="document">Número de documento</label>
          <input
            id="document"
            value={document}
            onChange={(e) => {
              setDocument(e.target.value);
            }}
            type="text"
            placeholder="102457040"
            required
          />
        </div>
        <div className="input_new_record">
          <label htmlFor="start">Elija su fecha de nacimiento</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            min="1900-01-01"
            max={maxDate}
            required
          />
        </div>
        <div className="input_new_record">
          <label htmlFor="firstName">Elija su departamento actual</label>
          <Select
            id="departament"
            onChange={(e) => setDepartametSelect(e.target.value)}
            label="Seleccione el tipo de documento"
            required
          >
            {departament.map((departament, index) => (
              <SelectItem key={index} value={departament}>
                {departament}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="input_new_record">
          <label htmlFor="city">Elija su municipio actual</label>
          <Select
            id="city"
            onChange={(e) => setCitiSelecte(e.target.value)}
            label="Seleccione el tipo de documento"
            required
          >
            {cities.map((departament, index) => (
              <SelectItem key={index} value={departament}>
                {departament}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="input_new_record">
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            placeholder="Calle 10#20-54"
            required
          />
        </div>
        <div className="input_new_record">
          <label htmlFor="phone">Celular</label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="phone"
            placeholder="+57 3002547100"
            required
          />
        </div>
        <div className="input_new_record">
          <label htmlFor="occupation">Ocupación</label>
          <input
            id="occupation"
            value={occupation}
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
            type="phone"
            placeholder="Independiente"
            required
          />
        </div>
        <div className="input_new_record">
          <label htmlFor="occupation">AlDia necesita recopilar y procesar cierta información para generar su declaración de renta de manera precisa. Al marcar esta casilla, usted acepta que sus datos serán utilizados con este propósito, de acuerdo con nuestra política de privacidad.</label>
          <Checkbox onValueChange={setDataPolitic} color="success">Acepto</Checkbox>
        </div>
        <Button className="button_record_form" type="submit">
          Siguiente
        </Button>
      </form>
    </>
  );
}
export default SecondForm;
