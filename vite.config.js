/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Automatically set base path for GitHub Pages deployments using repository name
  base: process.env.GITHUB_REPOSITORY && !process.env.CUSTOM_DOMAIN
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
})
