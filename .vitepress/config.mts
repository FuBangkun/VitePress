import { defineConfig } from 'vitepress'
import { InlineLinkPreviewElementTransform } from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'

const docsSidebarAndNav = [
  {
    text: '开发环境',
    items: [
      { text: '开发环境配置', link: '/env/env-configure' },
      { text: '集成开发环境', link: '/env/ide' }
    ]
  },
  {
    text: 'Git',
    items: [
      { text: 'Git', link: '/git/git' },
      { text: 'GitHub', link: '/git/github' }
    ]
  },
  {
    text: 'Arch Linux',
    items: [
      { text: '介绍', link: '/linux/linux' },
      { text: 'Arch Linux 安装', link: '/linux/install' },
      { text: '桌面端配置', link: '/linux/desktop-configure' },
      { text: '桌面端游戏', link: '/linux/desktop-game' },
      { text: 'NAS 配置', link: '/linux/nas-configure' }
    ]
  }
]

export default defineConfig({
  title: "FuBangkun's Website",
  description: "Description",
  lang: "zh-CN",
  
  head: [
    [
      'link',
      {
        rel: 'preload',
        href: '/JetBrainsMono-Regular.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
      }
    ]
  ],

  locales: {
    "/": { label: "简体中文", lang: "zh-CN" },
  },

  themeConfig: {
    docFooter: { prev: "上一篇", next: "下一篇" },
    darkModeSwitchLabel: "切换主题",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    outlineTitle: "页面内容",

    nav: [
      { text: '首页', link: '/' },
      ...docsSidebarAndNav
    ],
    sidebar: docsSidebarAndNav,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fubangkun/vitepress' }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: '45JXO1RMIL',
        apiKey: '6680481b952ac044559f084ef5918ac1',
        indexName: 'doc',
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                searchBox: { placeholderText: '搜索文档' },
                footer: { selectText: '选择', navigateText: '导航', closeText: '关闭' }
              }
            }
          }
        }
      },
    },

    footer: {
      message: 'Released under the GPL v3 License.',
      copyright: 'Copyright © 2026 FuBangkun'
    },

    notFound: {
      title: "页面未找到",
      quote: "但如果你不改变方向，继续寻找，你可能会最终走到你想要的方向。",
      linkText: "返回首页",
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'full', timeStyle: 'medium' }
    },
  },

  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    config(md) {
      md.use(InlineLinkPreviewElementTransform)
    }
  },

  vite: {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui',
        '@nolebase/vitepress-plugin-inline-link-preview/client',
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui',
        '@nolebase/vitepress-plugin-inline-link-preview',
      ],
    },
  },

  lastUpdated: true
})