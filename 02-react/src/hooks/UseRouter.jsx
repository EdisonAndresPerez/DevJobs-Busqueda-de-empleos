import { useEffect, useState } from "react";

export function UseRouter() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    const handlePostState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener("popstate", handlePostState);

    return () => {
      window.removeEventListener("popstate", handlePostState);
    };
  }, []);

  return {currentPage};
}
