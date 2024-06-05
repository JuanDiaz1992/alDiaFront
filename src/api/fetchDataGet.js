import getCookie from "../Scripts/getCookies";
import axios from 'axios';

async function fetchGetData(apiEndpoint) {
  const baseUrl = process.env.REACT_APP_URL_HOST;
  const url = baseUrl + apiEndpoint;

  try {
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
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchGetData;
