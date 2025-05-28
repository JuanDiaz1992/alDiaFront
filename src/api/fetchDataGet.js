import getCookie from "../Scripts/getCookies";
import axios from 'axios';

async function fetchGetData(apiEndpoint, asBlob = false) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = baseUrl + apiEndpoint;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      'Content-Type': 'application/json',
    },
    responseType: asBlob ? 'blob' : 'json',
  });
  return response.data;
}

export default fetchGetData;