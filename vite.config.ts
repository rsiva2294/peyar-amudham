/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\/data\/names\.json$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'names-data-cache',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 30 // <== 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        id: '/',
        name: 'PEYAR AMUDHAM',
        short_name: 'PeyarAmudham',
        description: 'Explore 30k+ pure classical Tamil names with profound meanings and ancestral heritage.',
        theme_color: '#0B0E14',
        background_color: '#0B0E14',
        display: 'standalone',
        orientation: 'portrait',
        dir: 'ltr',
        categories: ['education', 'lifestyle', 'reference'],
        launch_handler: {
          client_mode: ['navigate-existing', 'auto']
        },
        shortcuts: [
          {
            name: 'Search Names',
            short_name: 'Search',
            description: 'Go to the search screen',
            url: '/',
            icons: [{ src: 'pwa-192.png', sizes: '192x192' }]
          }
        ],
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  // @ts-ignore
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
