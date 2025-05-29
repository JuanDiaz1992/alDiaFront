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

function EditProfile({ user, onOpenChange, setChanges }) {
  const documents = [
    { name: "Cédula de ciudadanía", id: 1, value: "CEDULA_DE_CIDADANIA" },
    { name: "Cédula de extranjería", id: 3, value: "CEDULA_DE_EXTRANJERIA" },
    { name: "Tarjeta de extranjería", id: 4, value: "TARJETA_DE_EXTRANJERIA" },
    { name: "Pasaporte", id: 5, value: "PASAPORTE" },
  ];

  const civilStates = [
    { name: "Soltero", id: 1, value: "SOLTERO" },
    { name: "Casado", id: 2, value: "CASADO" },
    { name: "Unión Libre", id: 3, value: "UNION_LIBRE" },
    { name: "Divorsiado", id: 4, value: "DIVORSIADO" },
    { name: "Separado", id: 5, value: "SEPARADO" },
    { name: "Viudo", id: 6, value: "VIUDO" },
  ];

  // Fecha máxima para nacimiento
  const today = dateToday();
  const year = today.split("-")[0] - 18;
  const maxDate = `${year}-${today.split("-")[1]}-${today.split("-")[2]}`;

  // Estados para departamentos y ciudades
  const [departmentsAndCities, setDepartmentsAndCities] = useState([]);
  const [departament, setDepartamet] = useState([]);
  const [cities, setCities] = useState([]);

  // Estados del formulario
  const [name, setName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [surnamen, setSurnamen] = useState(user.surnamen || "");
  const [document, setDocument] = useState(user.document || "");
  const [birthdate, setBirthdate] = useState(user.birthDate || "");
  const [address, setAddress] = useState(user.address || "");
  const [phone, setPhone] = useState(user.numberPhone || "");
  const [occupation, setOccupation] = useState(user.occupation || "");
  const [dataPolitic, setDataPolitic] = useState(user.dataTreatment || false);

  // Preselección de tipo de documento
  const [typeDocument, setTypeDocument] = useState(() => {
    const found = documents.find((doc) => doc.value === user.typeDocument);
    return found ? found.id : "";
  });

  // Preselección de estado civil
  const [civilState, setCivilState] = useState(() => {
    const found = civilStates.find((state) => state.value === user.civilStatus);
    return found ? found.id : "";
  });

  // Preselección de departamento y ciudad
  const [departamentSelect, setDepartametSelect] = useState(null);
  const [citiSelecte, setCitiSelecte] = useState(null);

  // Cargar departamentos y ciudades
  useEffect(() => {
    fetch("https://www.datos.gov.co/resource/95qx-tzs7.json")
      .then((response) => response.json())
      .then((data) => {
        setDepartmentsAndCities(data);
        const newArray = [
          ...new Set(data.map((departament) => departament.departamento)),
        ];
        setDepartamet(newArray);

        // Preselección de departamento
        if (user.department) {
          const depIndex = newArray.findIndex(
            (dep) => dep.toLowerCase() === user.department.toLowerCase()
          );
          if (depIndex !== -1) setDepartametSelect(depIndex);
        }
      });
  }, [user.department]);

  // Cargar ciudades según departamento seleccionado
  useEffect(() => {
    if (departamentSelect !== null && departament[departamentSelect]) {
      const filterDepartments = departmentsAndCities.filter(
        (departamentFilter) =>
          departamentFilter.departamento === departament[departamentSelect]
      );
      const newArray = [
        ...new Set(filterDepartments.map((cities) => cities.municipio)),
      ];
      setCities(newArray);

      // Preselección de ciudad
      if (user.town) {
        const cityIndex = newArray.findIndex(
          (city) => city.toLowerCase() === user.town.toLowerCase()
        );
        if (cityIndex !== -1) setCitiSelecte(cityIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departamentSelect, departmentsAndCities, user.town]);

  // Envío del formulario
  const sendForm = async () => {
    const body = {};

    if (name) body.name = name;
    if (lastName) body.lastName = lastName;
    if (surnamen) body.surnamen = surnamen;
    if (typeDocument) body.typeDocument = typeDocument;
    if (document) body.document = document;
    if (birthdate) body.birthDate = birthdate;
    if (departamentSelect !== null && departament[departamentSelect])
      body.department = departament[departamentSelect];
    if (citiSelecte !== null && cities[citiSelecte])
      body.town = cities[citiSelecte];
    if (address) body.address = address;
    if (civilState) body.civilStatus = civilState;
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
              selectedKeys={typeDocument ? [typeDocument] : []}
              onChange={(e) => setTypeDocument(e.target.value)}
              label="Seleccione su tipo de documento"
              required
            >
              {documents.map((document) => (
                <SelectItem key={document.id} value={document.id}>
                  {document.name}
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
              selectedKeys={
                departamentSelect !== null ? [departamentSelect.toString()] : []
              }
              onChange={(e) => setDepartametSelect(Number(e.target.value))}
              label="Elija su departamento actual"
              required
            >
              {departament.map((departament, index) => (
                <SelectItem key={index} value={index}>
                  {departament}
                </SelectItem>
              ))}
            </Select>
            <Select
              selectedKeys={
                citiSelecte !== null ? [citiSelecte.toString()] : []
              }
              onChange={(e) => setCitiSelecte(Number(e.target.value))}
              label="Elija su municipio actual"
              required
            >
              {cities.map((city, index) => (
                <SelectItem key={index} value={index}>
                  {city}
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
              type="text"
              placeholder="Independiente"
              label="Ocupación"
              required
            />
            <Select
              selectedKeys={civilState ? [civilState] : []}
              onChange={(e) => setCivilState(e.target.value)}
              label="Estado Civil"
              required
            >
              {civilStates.map((state) => (
                <SelectItem key={state.id} value={state.id}>
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
            <Checkbox
              onValueChange={setDataPolitic}
              color="success"
              isSelected={dataPolitic}
            >
              Acepto
            </Checkbox>
          </form>
          <Button color="success" onPress={sendForm}>
            Envíar
          </Button>
        </ModalBody>
      </ModalContent>
    </>
  );
}

export default EditProfile;