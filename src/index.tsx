/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import "solid-devtools";

import App from "./App";
import { Route, Router } from "@solidjs/router";
import Home from "./home";
import SingleProduct from "./single_product";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={App} />
      <Route path="/home" component={Home} />
      <Route path="/single_product/:id" component={SingleProduct} />
    </Router>
  ),
  root!,
);
