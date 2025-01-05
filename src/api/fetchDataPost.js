import getCookie from "../Scripts/getCookies";
import axios from 'axios';
async function fetchDataPost(apiEndpoint,body) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url =  baseUrl + apiEndpoint;
  const response = await axios.post(url,body, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}
export default fetchDataPost;

