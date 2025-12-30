import { Link as NavLink } from "react-router";


const Link = ({ href, children, ...restoOfProps }) => {


  return (
    <NavLink to={href} {...restoOfProps}>
      {children}
    </NavLink>
  );
};

export default Link;
