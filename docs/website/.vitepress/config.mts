import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@litert/config-loader",
  description: "Documents for @litert/config-loader",
  base: '/projects/config-loader.js/',
  sitemap: {
    hostname: 'https://litert.org/projects/config-loader.js/'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides/quick-start' },
      { text: 'API Reference', link: '/api/' },
    ],

    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Quick Start', link: '/guides/quick-start' },
          { text: 'Built-in Operators', link: '/guides/built-in-operators' },
          { text: 'Custom Operators', link: '/guides/custom-operators' },
          { text: 'Custom Encodings', link: '/guides/custom-encodings' },
          { text: 'Custom Data Readers', link: '/guides/custom-readers' },
          { text: 'Custom Syntax', link: '/guides/custom-syntax' },
          { text: 'Load From Object', link: '/guides/load-from-object' },
        ]
      },
      {
        text: 'API Reference',
        items: typedocSidebar,
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/litert/config-loader.js' }
    ]
  }
})
