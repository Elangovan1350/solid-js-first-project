import type { Component } from "solid-js";
import { createSignal, createEffect, onMount, For } from "solid-js";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  [key: string]: any;
}

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [isDark, setIsDark] = createSignal(false);
  const [products, setProducts] = createSignal<Product[]>([]);
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    console.log("Component mounted");
    axios.get("https://dummyjson.com/products").then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setLoading(false);
    });
  });

  createEffect(() => {
    console.log("Products: ", products());
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
        class={` flex flex-col justify-center items-center ${isDark() ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <button onClick={() => setIsDark((prev) => !prev)}>Toggle</button>
        <p class="text-4xl text-green-700 text-center py-20">
          Hello {count()}!
        </p>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Count: {count()}
        </button>
        {loading() ? (
          <p>Loading...</p>
        ) : (
          <ul>
            <For each={products()}>
              {(product) => (
                <li class=" py-5 text-2xl text-red-500 font-bold ">
                  {product.title}
                </li>
              )}
            </For>
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
