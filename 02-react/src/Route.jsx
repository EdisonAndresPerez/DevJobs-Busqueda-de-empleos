import { createElement } from "react";
import { UseRouter } from "./hooks/useRouter";

export default function Route({ path, component: Component }) {
    const { currentPage } = UseRouter();

    if (currentPage !== path) return null;

    return createElement(Component);
}
