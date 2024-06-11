import getCookie from "../Scripts/getCookies";

async function fetchDataDelete(apiEndpoint) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url =  baseUrl + apiEndpoint;

  const defaultOptions = {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return await response.json();
}

export default fetchDataDelete;