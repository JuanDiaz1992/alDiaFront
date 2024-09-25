import FormFinancial from "../FormFinancial";
import { useState, useEffect } from "react";
import fetchDataGet from "../../api/fetchDataGet";

function EditHistory({data,table, fromEdit}) {
  const [date, setDate] = useState(data.date);
  const [amount, setAmount] = useState(data.amount);
  const [description, setDescription] = useState(data.description);
  const [descriptionLabel, setDescriptionLabel] = useState("");
  const [category, setCategory] = useState(data.category.idCategory);
  const [file, setFile] = useState(data.picture);
  const [categoryFromBd, setCategoryFromBd] = useState([]);
  const [isPlanned, setIsPlanned] = useState(data.is_planned);
  const [fileFull, setFileFUll] = useState(null);
  console.log(isPlanned)
  const options = [
    {
      name: "Gastos",
      type: "expenses",
      descriptionLabel: "Pago del arriendo",
    },
    {
      name: "Ingresos",
      type: "incomes",
      descriptionLabel: "Sueldo quincena",
    },
  ];


  useEffect(() => {
    const getData = async () => {
        let response = await fetchDataGet(
          `/api/v1/users/financial/categories/${table}`
        );
        if (response) {
          if (table === "expenses" && data.description!="" ) {
            setDescriptionLabel(options[0]["descriptionLabel"]);
          } else {
            setDescriptionLabel(options[1]["descriptionLabel"]);
          }
          setCategoryFromBd(response);
        }
      }
    getData();
  }, [table]);




  //Mostrar imagen temporalmente
  const manejarSeleccionImagen = (e) => {
    setFileFUll(e.target.files[0]);
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setFile(urlTemporal);
    }
  };

  return <>
    <div className="flex justify-center mb-[25px]">
      <h2><strong>Editar Registro</strong></h2>
    </div>
    <label htmlFor="category" className="mb-[-10px]">Categoría</label>
    <div className="w-[100%] h-[45px] bg-[#F4F4F5] flex justify-center rounded-xl">
      <select
        id="category"
        className="w-[95%] h-[45px] bg-[#F4F4F5]"
        value={category} // Usamos el idCategory del objeto data.category
        onChange={(e) => setCategory(e.target.value)} // Captura el valor seleccionado
      >
        {categoryFromBd.map((categoryItem, index) => (
          <option key={index} value={categoryItem.idCategory}>
            {categoryItem.name}
          </option>
        ))}
      </select>
    </div>
    <FormFinancial
      manejarSeleccionImagen={manejarSeleccionImagen}
      setDate={setDate}
      date={date}
      setAmount={setAmount}
      amount={amount}
      setDescription={setDescription}
      description={description}
      descriptionLabel={descriptionLabel}
      category={category}
      categoryFromEdit={data.category.idCategory}
      setIsPlanned={setIsPlanned}
      isPlanned={isPlanned}
    />
    <div className={`${file ? "flex" : "hidden"} justify-center items-center w-[100%] max-w-[559px] h-fit md:h-[604px] rounded-[10px] pt-[45px] pb-[45px] relative bg-white`}>
      {file && <img src={file} alt="" className="object-cover w-[70%] rounded-lg" />}
    </div>
  </>;
}

export default EditHistory;
