import { useNavigate } from "react-router";
import { useLocation } from "react-router";

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
