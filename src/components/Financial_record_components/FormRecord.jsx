import dateToday from "../../Scripts/obtenerFechaActual"
import { useEffect, useState  } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import getCookie from "../../Scripts/getCookies"
function FormRecord({tableGet, setOption, descriptionLabel, tablePost}){
    const url = useSelector((state)=>state.data_aldia.url);
    const userID = useSelector((state)=>state.data_aldia.id_user);
    const today = dateToday();
    const [date,setDate] = useState(today)
    const [amount,setAmount] = useState("")
    const [description,setDescription] = useState("")
    const [categoryFromBd,setCategoryFromBd] = useState([])
    const [category, setCategory] = useState(new Set([]));

    useEffect(()=>{
        fetch(`${url}${tableGet}/`,{
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
    const sendInfo=(e)=>{
      e.preventDefault();


      if(amount && date && categoryFromBd[category["currentKey"]]["id"]){
        fetch(url,{
          method:"POST",
          mode:"cors",
          headers:{
            Authorization: "Token " + getCookie("token"),
            Module: "financial_record"
          },
          body:JSON.stringify({
            "table":tablePost,
            "id_user":userID,
            "date":date,
            "amount":amount,
            "description":description,
            "category":categoryFromBd[category["currentKey"]]["id"],
            "record_income":true
            })
        })
        .then(response=>response.json())
        .then(data=>{
          let icon = ''
          if(data.status === 200){
            icon = '👏'
            setDate(today);
            setAmount("");
            setDescription("");
            setCategory(["$.0"])
          }else{
            icon = '🚫'
          }
          toast(data.message,
            { 
              duration: 3000,
              position: "bottom-right",
              icon:icon,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
        })
      }
    }
    return(
    <>
        <form className="formRecord" onSubmit={(e)=>sendInfo(e)}>
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
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                type="text"
                placeholder={descriptionLabel}
            />
        </div>
        <div className="input_new_record">
          <Select
            id="departament"
            label="Categoría"
            onSelectionChange={setCategory}
            placeholder="Categoría"
            required
            defaultSelectedKeys={["$.0"]}
            selectedKeys={category}
          >
            <SelectItem value="">Seleccione una opción</SelectItem>
            {categoryFromBd.map((category, index) => (
              <SelectItem key={index} value={category["id"]}>
                {category["name_category"]}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="buttons_container">
          <Button color="primary" type="submit">Registrar</Button>
          <Button className="come_back_button" type="button" isIconOnly color="warning" onClick={()=>setTimeout(setOption, 600)}>
            <IoIosArrowRoundBack />
          </Button>
        </div>

          
        </form>

    </>
    )
}
export default FormRecord