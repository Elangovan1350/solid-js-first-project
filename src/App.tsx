import type { Component } from "solid-js";
import { A, Route } from "@solidjs/router";
import Home from "./home";

const App: Component = () => {
  return (
    <div>
      <h1>App</h1>
      <nav>
        <A href="/home">Home</A>
      </nav>
    </div>
  );
};

export default App;
