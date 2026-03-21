import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "付邦坤的网站",
  description: "A VitePress Site",
  lang: "zh-CN",
  locales: {
    "/": {
      label: "简体中文",
      lang: "zh-CN",
    },
  },
  themeConfig: {
    darkModeSwitchLabel: "切换主题",

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    outlineTitle: "页面内容",

    sidebarMenuLabel: "菜单",

    nav: [
      { text: '首页', link: '/' },
      {
        text: '开发环境',
        items: [
          { text: '开发环境', link: '/env/index' },
          { text: 'Unix 工具链', link: '/env/unix' },
          { text: 'Java', link: '/env/java' }, 
          { text: '集成开发环境', link: '/env/ide' }
        ]
      },
      {
        text: 'Git',
        items: [
          { text: 'Git', link: '/git/index' },
          { text: 'GitHub', link: '/git/github' }
        ]
      },
      {
        text: 'Arch Linux',
        items: [
          { text: '介绍', link: '/linux/index' },
          { text: '系统安装', link: '/linux/install' },
          { text: '系统配置', link: '/linux/arch-configure' },
          { text: '游戏配置', link: '/linux/game-configure' },
          { text: 'NAS 安装', link: '/linux/nas-install' }
        ]
      }
    ],

    sidebar: [
      {
        text: '开发环境',
        items: [
          { text: '开发环境', link: '/env/index' },
          { text: 'Unix 工具链', link: '/env/unix' },
          { text: 'Java', link: '/env/java' }, 
          { text: '集成开发环境', link: '/env/ide' }
        ]
      },
      {
        text: 'Git',
        items: [
          { text: 'Git', link: '/git/index' },
          { text: 'GitHub', link: '/git/github' }
        ]
      },
      {
        text: 'Arch Linux',
        items: [
          { text: '介绍', link: '/linux/index' },
          { text: '系统安装', link: '/linux/install' },
          { text: '系统配置', link: '/linux/arch-configure' },
          { text: '游戏配置', link: '/linux/game-configure' },
          { text: 'NAS 安装', link: '/linux/nas-install' }
        ]
      }
    ],

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
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },

    footer: {
      message: '根据 GPL v3 许可证发布。',
      copyright: 'Copyright ©2026 付邦坤'
    },

    notFound: {
      title: "页面未找到",
      quote: "但如果你不改变方向，继续寻找，你可能会最终走到你想要的方向。",
      linkText: "返回首页",
    },
  },
  markdown: { 
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },
  lastUpdated: true
})
