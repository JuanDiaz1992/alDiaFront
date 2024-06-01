import fetchDataImg from "../api/fetchGetInstanceImg";

const getPhotoUrl = async (photoKey) => {

    try {
      const response = await fetchDataImg(photoKey)
      return URL.createObjectURL(response);
    } catch (error) {
      return null;
    }




};

export default getPhotoUrl;

