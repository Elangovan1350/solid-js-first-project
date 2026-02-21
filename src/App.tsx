import type { Component } from "solid-js";
import { createSignal, createEffect, onMount } from "solid-js";

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [isDark, setIsDark] = createSignal(false);

  onMount(() => {
    console.log("Component mounted");
  });

  createEffect(() => {
    console.log("Count: ", count());
  });

  createEffect(() => {
    console.log("Is Dark: ", isDark());
  });

  return (
    <>
      <div
        class={` h-screen w-screen flex flex-col justify-center items-center ${isDark() ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <button onClick={() => setIsDark((prev) => !prev)}>Toggle</button>
        <p class="text-4xl text-green-700 text-center py-20">
          Hello {count()}!
        </p>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Count: {count()}
        </button>
      </div>
    </>
  );
};

export default App;
