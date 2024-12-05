import { useEffect } from "react";
import fetchGetData from "../../api/fetchDataGet";
function GetHeritages(){
    const getHeritagesApi=async()=>{
        const response = await fetchGetData(`/api/v1/users/heritages/getheritages?page=${0}&size=5`);
        if(response){
            console.log(response)
        }
    }
    useEffect(()=>{
        getHeritagesApi();
    },[])
    return(
        <>
            
        </>
    )
}
export default GetHeritages;