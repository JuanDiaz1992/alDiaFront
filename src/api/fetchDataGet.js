import getCookie from "../Scripts/getCookies";
import axios from 'axios';

async function fetchGetData(apiEndpoint) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = baseUrl + apiEndpoint;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !==200 ) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.data;

}

export default fetchGetData;
