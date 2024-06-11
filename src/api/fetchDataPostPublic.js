async function fetchDataPostPublic(apiEndpoint,body) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url =  baseUrl + apiEndpoint;

  const defaultOptions = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    console.log(response.statusText)
  }
  return await response.json();

}

export default fetchDataPostPublic;