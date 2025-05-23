import { useEffect, useState } from "react";
import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import fetchGetData from "../../api/fetchDataGet";
import fetchDataPost from "../../api/fetchDataPost";
import { toast } from "react-hot-toast";

export default function FormRegisterMarriages() {
  const [typesHeritages, setTypesHeritages] = useState([]);
  const [selectedType, setSelectedType] = useState(new Set([]));
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [ownershipPercentage, setOwnershipPercentage] = useState("");

  useEffect(() => {
    const getTypesHeritages = async () => {
      const response = await fetchGetData(
        "/api/v1/users/heritages/types-heritages"
      );
      if (response.status === 200) {
        console.log(response);
        setTypesHeritages(response.typeHeritages);
      }
    };
    getTypesHeritages();
  }, []);

  // ...existing code...
  const handleSubmit = async (e) => {
    e.preventDefault();
    const idx = selectedType["currentKey"];
    const typeSelected = typesHeritages[idx];
    const body = {
      currenValue: Number(value),
      acquisitionValue: Number(value),
      acquisitionDate,
      description,
      typeHeritages: typeSelected,
      location: isRealEstate() ? location : null,
      percentage: Number(ownershipPercentage),
    };
    const response = await fetchDataPost(
      "/api/v1/users/heritages/saveheritage",
      body
    );
    if (parseInt(response.status) === 200) {
      setSelectedType(new Set([]));
      setDescription("");
      setValue("");
      setLocation("");
      setAcquisitionDate("");
      setOwnershipPercentage("");
      toast.success("Patrimonio registrado correctamente");
    } else {
      toast.error("Error al registrar el patrimonio");
    }
  };
  // ...existing code...

  // Determina si el tipo seleccionado es "Bienes raíces"
  const isRealEstate = () => {
    const idx = selectedType["currentKey"];
    if (idx === undefined) return false;
    const selected = typesHeritages[idx];
    // Nombres exactamente como vienen de la API
    const realEstateNames = ["Casa", "Apartamento", "Terreno"];
    return selected && realEstateNames.includes(selected.name);
  };

  return (
    <section className="container pt-[100px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded-lg"
      >
        <Select
          label="Tipo de patrimonio"
          onSelectionChange={setSelectedType}
          required
          placeholder="Seleccione un tipo"
          selectedKeys={selectedType}
        >
          {typesHeritages.map((type, idx) => (
            <SelectItem key={idx} value={type.id_type || idx}>
              {type.name || type}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Ej: Casa en la playa"
        />
        <Input
          label="Valor estimado"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          placeholder="Ej: 100000"
          min={0}
        />
        {isRealEstate() && (
          <Input
            label="Dirección del bien"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Ej: Calle 123, Ciudad"
          />
        )}
        <Input
          label="Fecha de adquisición"
          type="date"
          value={acquisitionDate}
          onChange={(e) => setAcquisitionDate(e.target.value)}
          required
        />
        <Input
          label="Porcentaje de propiedad (%)"
          type="number"
          value={ownershipPercentage}
          onChange={(e) => setOwnershipPercentage(e.target.value)}
          required
          placeholder="Ej: 100"
          min={1}
          max={100}
        />
        <Button color="primary" type="submit">
          Registrar patrimonio
        </Button>
      </form>
    </section>
  );
}
