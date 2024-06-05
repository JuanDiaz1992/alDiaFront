import getCookie from "../Scripts/getCookies";
import axios from 'axios';

async function fetchDataImg(apiEndpoint) {
  const baseUrl = process.env.REACT_APP_URL_HOST;
  const url = baseUrl + apiEndpoint;

  const token = getCookie("token"); // Retrieve token from cookie

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'image/*',
        'Content-Type': 'application/json', // May be unnecessary for image fetch
      },
      responseType: 'blob', // Request image data as a blob
      cache: 'no-cache',
      cacheControl: 'no-cache, no-store, must-revalidate'
    });

    if (response.status !==200 ) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.data; // Return the image data (blob)
  } catch (error) {
    console.error("Error fetching image data:", error);
    throw error; // Re-throw for further error handling
  }
}

export default fetchDataImg;
