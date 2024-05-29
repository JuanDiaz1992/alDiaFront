import getCookie from "../Scripts/getCookies"; // Assuming this function retrieves your token

async function fetchDataImg(apiEndpoint) {
  const baseUrl = process.env.REACT_APP_URL_HOST; // Fixed base URL
  const url =  baseUrl + apiEndpoint; // Combine base URL with API endpoint

  const defaultOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      Accept: 'image/*',
      'Content-Type': 'application/json',
    },
    responseType: 'blob'
  };
  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchDataImg;