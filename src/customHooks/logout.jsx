import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('token');
    localStorage.clear();
    navigate("/login");
  };

  return logout;
};

export default useLogout;