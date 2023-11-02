import { useEffect, useState } from "react";
import dateToday from "../../Scripts/obtenerFechaActual"
import { Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import getCookie from "../../Scripts/getCookies"
function FormRecord({table}){
    const url = useSelector((state)=>state.data_aldia.url);
    const userID = useSelector((state)=>state.data_aldia.id_user);
    const today = dateToday();
    const [date,setDate] = useState(today)
    const [amount,setAmount] = useState("")
    const [categoryFromBd,setCategoryFromBd] = useState([])
    const [category, setCategory] = useState("")
    // console.log(categoryFromBd[category]["id"])
    useEffect(()=>{
        fetch(`${url}${table}/`,{
            method:"GET",
            mode:"cors",
            headers:{
                Authorization: "Token " + getCookie("token"),
                Module: "financial_record"
            }
        })
        .then(response =>response.json())
        .then(data=>{
            if (data.status) {
                setCategoryFromBd(data.results)
            }
        })
    },[])
    return(
    <>
        <form action="">
        <div className="input_new_record">
            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
              max={today}
            />
        </div>
        <div className="input_new_record">
            <label htmlFor="amount">Monto</label>
            <input
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                type="number"
                placeholder="0.00 COP"
            />
        </div>
        <div className="input_new_record">
            <label htmlFor="description">Descripción</label>
            <textarea
                id="description"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                type="text"
                placeholder="Descripción"
            />
        </div>
        <div className="input_new_record">
          <label htmlFor="departament">Elija su departamento actual</label>
          <Select
            id="departament"
            onChange={(e) => setCategory(e.target.value)}
            label="Seleccione la categoría"
            required
          >
            {categoryFromBd.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category["name_category"]}
              </SelectItem>
            ))}
          </Select>
        </div>
          
        </form>
    </>
    )
}
export default FormRecord