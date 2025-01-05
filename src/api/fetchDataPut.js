import getCookie from "../Scripts/getCookies";
import axios from 'axios';

async function fetchDataPut(apiEndpoint, body) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = baseUrl + apiEndpoint;
  const response = await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.status !==200) {
    throw new Error(`Error fetching data: ${response.message}`);
  }
  return await response.data;
}

export default fetchDataPut;
