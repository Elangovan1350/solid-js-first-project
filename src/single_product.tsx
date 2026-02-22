import type { Component } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import axios from "axios";

const fetcher = (id: string) =>
  axios.get(`https://dummyjson.com/products/${id}`).then((res) => res.data);

const SingleProduct: Component = () => {
  const params = useParams();
  const [product] = createResource(() => params.id, fetcher);
  console.log(product(), params.id);
  return (
    <div class="p-6 max-w-4xl mx-auto">
      <A href="/home" class="text-blue-500 hover:underline">
        ← Back to Products
      </A>

      <Show
        when={product()}
        fallback={
          <div class="flex flex-col items-center justify-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p class="mt-4 text-gray-500">Fetching product details...</p>
          </div>
        }
      >
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <img src={product().thumbnail} class="w-full rounded-xl shadow-lg" />
          <div>
            <h1 class="text-3xl font-bold">{product().title}</h1>
            <p class="text-gray-500 mt-2">{product().category}</p>
            <p class="text-2xl font-bold text-blue-600 mt-4">
              ${product().price}
            </p>
            <p class="mt-4 leading-relaxed text-gray-700">
              {product().description}
            </p>
            <button class="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default SingleProduct;
