export const Navegation = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage == totalPages;

  const handlePrevClick = (event) => {
    console.log("atras");
    event.preventDefault();
    if (isFirstPage === false) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextCLick = (event) => {
    console.log("siguiente");
    event.preventDefault();
    if (isLastPage === false) {
      onPageChange(currentPage + 1);
    }
  };

  const handleChangePage = (event, page) => {
    event.preventDefault();
    if (page != currentPage) {
      onPageChange(page);
    }
  };

  const stylePrevButton = isFirstPage
    ? { pointerEvents: "none", opacity: 0.5 }
    : {};
  const styleNextButton = isLastPage
    ? { pointerEvents: "none", opacity: 0.5 }
    : {};

  return (
    <nav className="pagination">
      <a onClick={handlePrevClick} href="#" style={stylePrevButton}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      {pages.map((page, key) => {
        return (
          <a
            key={key}
            href="#"
            className={currentPage === page ? "is-active" : ""}
            onClick={(event) => handleChangePage(event, page)}
          >
            {page}
          </a>
        );
      })}

      <a onClick={handleNextCLick} href="#" style={styleNextButton}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </nav>
  );
};
