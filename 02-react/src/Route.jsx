import { createElement } from "react";
import { useRouter } from "./hooks/UseRouter";

export default function Route({ path, component: Component }) {
  const { currentPage } = useRouter();

  if (currentPage !== path) return null;

  return createElement(Component);
}
