async function fetchDataPostPublic(apiEndpoint,body) {
  const baseUrl = process.env.REACT_APP_URL_HOST;
  const url =  baseUrl + apiEndpoint;

  const defaultOptions = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      console.log(response.statusText)
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export default fetchDataPostPublic;