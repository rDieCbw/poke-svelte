import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sass } from 'svelte-preprocess-sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    preprocess: {
      style: sass({}, {name: 'scss'}),
    },
  })]
})
