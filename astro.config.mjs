// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), partytown(), mdx(), icon()],

  vite: {
    plugins: [tailwindcss()],
  },
});