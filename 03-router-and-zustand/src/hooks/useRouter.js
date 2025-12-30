import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
  
export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (to) => {
    navigate(to);
  };

  return {
    navigateTo,
    currentPage: location.pathname,
    currentSearch: location.search,
  };
}
