import { useEffect, useState } from "react";

export function UseRouter() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [currentSearch, setCurrentSearch] = useState(window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
      setCurrentSearch(window.location.search);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return { currentPage, currentSearch, navigate };
}
