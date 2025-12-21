
const Link = ({ href, children, ...restoOfProps }) => {
    

    const handledClick = () => {
      event.preventDefault();
        window.history.pushState({}, "", href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }



  return (
   <a href={href}  {...restoOfProps}  onClick={handledClick}  >
    {children}
   </a>
  )
}

export default Link
