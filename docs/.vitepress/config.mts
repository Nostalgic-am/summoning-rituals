import { defineConfig } from "vitepress";

const BASE = "/kubejs/";

export default defineConfig({
  title: "KubeJS",
  description: "Documentation for KubeJS",
  base: BASE,

  head: [
    // Uncomment and replace with your favicon path if you have one
    // ['link', { rel: 'icon', href: `${BASE}favicon.ico` }],
  ],

  themeConfig: {
    // Top navigation bar
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/getting-started" },
      {
        text: "Links",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/Nostalgic-am/kubejs",
          },
        ],
      },
    ],

    // Sidebar navigation
    sidebar: [
      {
        text: "Intro",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
      {
        text: "Guide",
        items: [
          { text: "Configuration", link: "/configuration" },
          { text: "Example", link: "/example" },
        ],
      },
    ],

    // Show "Edit this page" link (update with your repo)
    editLink: {
      pattern:
        "https://github.com/Nostalgic-am/kubejs/edit/main/docs/:path",
      text: "Edit this page",
    },

    // Enable search
    search: {
      provider: "local",
    },

    // Social links in the nav bar
    socialLinks: [
      { icon: "github", link: "https://github.com/Nostalgic-am/kubejs" },
    ],

    // Footer
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Nostalgic-am",
    },

    lastUpdated: {
      text: "Last updated",
    },
  },

  // Enable last updated timestamps
  lastUpdated: true,
});
