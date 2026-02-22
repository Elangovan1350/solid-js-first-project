import type { Component } from "solid-js";
import { createSignal, For, createResource, Show, Suspense } from "solid-js";

import axios from "axios";
import { action, useSubmission, A } from "@solidjs/router";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  [key: string]: any;
}

const fetcher = () =>
  axios.get("https://dummyjson.com/products?limit=30").then((res) => res.data);

const getUserData = action(async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  return { success: true, name, email, password };
}, "getUserData");

const Home: Component = () => {
  const [isDark, setIsDark] = createSignal(false);
  const [data, { refetch }] = createResource(fetcher);
  const submission = useSubmission(getUserData);

  return (
    <div
      class={`min-h-screen ${isDark() ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Navbar */}
      <nav
        class={`sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm ${isDark() ? "bg-gray-800" : "bg-white"}`}
      >
        <h1 class="text-xl font-bold">🛒 SolidStore</h1>
        <A href="/">Home</A>
        <button
          class={`px-4 py-2 rounded-lg text-sm font-medium ${isDark() ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
          onClick={() => setIsDark((p) => !p)}
        >
          {isDark() ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>

      {/* Header */}
      <div class="text-center py-10 px-4">
        <h2 class="text-3xl font-bold mb-2">Our Products</h2>
        <p class={`${isDark() ? "text-gray-400" : "text-gray-500"}`}>
          Browse our collection
        </p>
      </div>
      <form
        action={getUserData}
        method="post"
        class="flex flex-col gap-4 max-w-sm mx-auto p-6"
      >
        <div class="flex flex-col">
          <label for="name" class="text-sm font-semibold">
            Name
          </label>
          <input type="text" name="name" id="name" class="border p-2 rounded" />
        </div>

        <div class="flex flex-col">
          <label for="email" class="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class="border p-2 rounded"
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            class="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={submission.pending}
          class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submission.pending ? "Submitting..." : "Submit"}
        </button>

        {/* Show success message based on the action return value */}
        <Show when={submission.result}>
          <p class="text-green-600">Successfully submitted!</p>
        </Show>
      </form>

      {/* Loading */}
      {/* <Show when={data.loading}>
        <div class="flex items-center justify-center">
          <p class="h-32 w-32 border-4 border-red-500 rounded-full animate-spin border-t-transparent border-b-transparent"></p>
        </div>
      </Show> */}

      {/* Error */}
      {/* <Show when={data.error}>
        <div class="text-center py-20">
          <p class="text-red-500 mb-4">Failed to load products.</p>
          <button
            onClick={() => refetch()}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </Show>

      {/* Product Grid */}
      <Suspense
        fallback={
          <div class="flex flex-col gap-2 items-center justify-center ">
            <p class="text-2xl font-bold">Loading...</p>
            <p class="text-gray-500">It will take a moment</p>
          </div>
        }
      >
        <div class="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={data()?.products}>
            {(product: Product) => (
              <A
                href={`/single_product/${product.id}`}
                class={`rounded-xl overflow-hidden shadow-lg ${isDark() ? "hover:shadow-amber-100" : "hover:shadow-gray-200"}   transition-shadow ${isDark() ? "bg-gray-800" : "bg-white"}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  class="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div class="p-4">
                  <h3 class="font-semibold text-lg mb-1 truncate">
                    {product.title}
                  </h3>
                  <p
                    class={`text-sm mb-3 line-clamp-2 ${isDark() ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {product.description}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="text-xl font-bold text-blue-500">
                      ${product.price}
                    </span>
                    <span
                      class={`text-sm ${isDark() ? "text-yellow-400" : "text-yellow-500"}`}
                    >
                      ⭐ {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </A>
            )}
          </For>
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
