import axios from "axios";
import useLogout from "./logout";

const useInterceptor = () => {
  const logout = useLogout();

  return () => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          logout();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  };

};

export default useInterceptor;
