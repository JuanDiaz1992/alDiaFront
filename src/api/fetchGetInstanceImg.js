import getCookie from "../Scripts/getCookies";

function fetchDataImg(apiEndpoint) {
  const baseUrl = process.env.REACT_APP_URL_HOST;
  const url = baseUrl + apiEndpoint;

  const defaultOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      Accept: 'image/*',
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
    cache: 'no-cache',
    cacheControl: 'no-cache, no-store, must-revalidate'
  };

  return fetch(url, defaultOptions)
    .then(response => {
      if (!response.ok) {
        console.log(response);
      }
      return response.blob();
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

export default fetchDataImg;
