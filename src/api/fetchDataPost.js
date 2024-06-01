import getCookie from "../Scripts/getCookies";

async function fetchDataGet(apiEndpoint,body) {
  const baseUrl = process.env.REACT_APP_URL_HOST;
  const url =  baseUrl + apiEndpoint;

  const defaultOptions = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export default fetchDataGet;