import {
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import dateToday from "../../Scripts/obtenerFechaActual";
import fetchDataPut from "../../api/fetchDataPut";
import toast from "react-hot-toast";
function EditProfile({ user, onOpenChange }) {
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

  const civilStates = [
    {
      name: "Soltero",
      id: 1,
    },
    {
      name: "Casado",
      id: 2,
    },
    {
      name: "Unión Libre",
      id: 3,
    },
    {
      name: "Divorsiado",
      id: 4,
    },
    {
      name: "Separado",
      id: 5,
    },
    {
      name: "Viudo",
      id: 5,
    },
  ];
  //Este bloque de código le resta 18 años a la fecha actual
  const today = dateToday();
  const year = today.split("-")[0] - 18;
  const maxDate = `${year}-${today.split("-")[1]}-${today.split("-")[2]}`;
  /**********************************************************************/

  const [formState, setFormState] = useState(true);

  /*Los siguientes 3 estados obtienen la información de departamentos
  y municipios de Colombia, se usa para filtrar el seleccionado */
  const [departmentsAndCities, setDepartmentsAndCities] = useState([]);
  const [departament, setDepartamet] = useState([]);
  const [cities, setCities] = useState([]);

  /*Estos estados contienen la información del formulario*/
  const [name, setName] = useState(user.name ? user.name : "");
  const [lastName, setLastName] = useState(user.lastName ? user.lastName : "");
  const [surnamen, setSurnamen] = useState(user.surnamen ? user.surnamen : "");
  const [typeDocument, setTypeDocument] = useState([]);
  const [document, setDocument] = useState(user.document ? user.document : "");
  const [birthdate, setBirthdate] = useState(
    user.birthDate ? user.birthDate : ""
  );
  const [address, setAddress] = useState(user.address ? user.address : "");
  const [phone, setPhone] = useState("");
  const [departamentSelect, setDepartametSelect] = useState(null);
  const [citiSelecte, setCitiSelecte] = useState(null);
  const [civilState, setcivilState] = useState(null);
  const [occupation, setOccupation] = useState(
    user.occupation ? user.occupation : ""
  );
  const [dataPolitic, setDataPolitic] = useState(false);

  const sendForm = async () => {
    const body = {};

    if (name) body.name = name;
    if (lastName) body.lastName = lastName;
    if (surnamen) body.surnamen = surnamen;
    if (typeDocument && documents[typeDocument]?.id)
      body.typeDocument = documents[typeDocument].id;
    if (document) body.document = document;
    if (birthdate) body.birthDate = birthdate;
    if (departamentSelect !== null && departament[departamentSelect])
      body.department = departament[departamentSelect];
    if (citiSelecte !== null && cities[citiSelecte])
      body.town = cities[citiSelecte];
    if (address) body.address = address;
    if (civilState !== null && civilStates[civilState]?.id)
      body.civilStatus = civilStates[civilState].id;
    if (phone) body.numberPhone = phone;
    if (occupation) body.occupation = occupation;
    if (dataPolitic !== undefined) body.dataTreatment = dataPolitic;

    try {
      const response = await fetchDataPut("/api/v1/users/profile/edit", body);
      if (response.status === 200) {
        toast.success("¡Datos actualizados correctamente!");
        onOpenChange();
      } else {
        toast.error(response.message || "Error al actualizar los datos.");
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar los datos.");
    }
  };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departamentSelect]);

  return (
    <>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3>Edita tus datos</h3>
          <p className="text-[#555555] text-[12px] mb-[20px] leading-[23px]">
            Por favor, complete esta información únicamente si desea que
            generemos su declaración de renta.
          </p>
        </ModalHeader>
        <ModalBody className="pb-[40px]">
          <form className="flex flex-col gap-[24px] pb-[40px] pr-[10px] overflow-x-auto h-[40vh]">
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Nombres"
              required
            />
            <div className="flex justify-between">
              <Input
                className="w-[48%]"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                label="Primer Apellido"
                required
              />
              <Input
                className="w-[48%]"
                onChange={(e) => setSurnamen(e.target.value)}
                value={surnamen}
                label="Segundo Apellido"
                required
              />
            </div>
            <Select
              onChange={(e) => setTypeDocument(e.target.value)}
              label="Seleccione su tipo de documento"
              required
            >
              {documents.map((document_set, index) => (
                <SelectItem key={index} value={document_set.id}>
                  {document_set.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              value={document}
              onChange={(e) => {
                setDocument(e.target.value);
              }}
              type="text"
              placeholder="102457040"
              label="Número de documento"
              required
            />
            <Input
              type="date"
              name="trip-start"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              min="1900-01-01"
              max={maxDate}
              label="Elija su fecha de nacimiento"
              required
            />
            <Input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              placeholder="Calle 10#20-54"
              required
              label="Dirección"
            />
            <Select
              onChange={(e) => setDepartametSelect(e.target.value)}
              label="Elija su departamento actual"
              required
            >
              {departament.map((departament, index) => (
                <SelectItem key={index} value={departament}>
                  {departament}
                </SelectItem>
              ))}
            </Select>
            <Select
              onChange={(e) => setCitiSelecte(e.target.value)}
              label="Elija su municipio actual"
              required
            >
              {cities.map((departament, index) => (
                <SelectItem key={index} value={departament}>
                  {departament}
                </SelectItem>
              ))}
            </Select>
            <Input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="phone"
              placeholder="+57 3002547100"
              label="Celular"
              required
            />
            <Input
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
              type="phone"
              placeholder="Independiente"
              label="Ocupación"
              required
            />
            <Select
              onChange={(e) => setcivilState(e.target.value)}
              label="Estado Civil"
              required
            >
              {civilStates.map((state, index) => (
                <SelectItem key={index} value={state.id}>
                  {state.name}
                </SelectItem>
              ))}
            </Select>
            <label htmlFor="occupation">
              AlDia necesita recopilar y procesar cierta información para
              generar su declaración de renta de manera precisa. Al marcar esta
              casilla, usted acepta que sus datos serán utilizados con este
              propósito, de acuerdo con nuestra política de privacidad.
            </label>
            <Checkbox onValueChange={setDataPolitic} color="success">
              Acepto
            </Checkbox>
          </form>
          <Button color={formState ? "success" : "default"} onPress={sendForm}>
            Envíar
          </Button>
        </ModalBody>
      </ModalContent>
    </>
  );
}
export default EditProfile;
