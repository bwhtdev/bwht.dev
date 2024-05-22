import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://bradswhite.github.io/bradswhite.com',
  base: 'bradswhite.com',
  integrations: [alpinejs(), tailwind(), mdx(), sitemap()]
});
