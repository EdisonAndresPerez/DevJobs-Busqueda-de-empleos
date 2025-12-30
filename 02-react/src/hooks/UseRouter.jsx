import { useNavigation } from "react-router";

export function useRouter() {
  const navigate = useNavigation();
  const location = useNavigation();

  const navigateTo = (to) => {
    navigate(to);
  };

  return {
    navigateTo,
    currentPage: location.pathname,
    currentSearch: location.search,
  };
}
