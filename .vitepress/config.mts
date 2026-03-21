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
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    darkModeSwitchLabel: "切换主题",
    lightModeSwitchTitle: "切换到浅色主题",
    darkModeSwitchTitle: "切换到深色主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    outlineTitle: "页面内容",

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
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                searchBox: {
                  clearButtonTitle: '清除',
                  clearButtonAriaLabel: '清除查询',
                  closeButtonText: '关闭',
                  closeButtonAriaLabel: '关闭',
                  placeholderText: '搜索文档',
                  searchInputLabel: '搜索'
                },
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '向上箭头',
                  navigateDownKeyAriaLabel: '向下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc 键',
                  poweredByText: '搜索提供商'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查网络连接。'
                },
                startScreen: {
                  recentSearchesTitle: '最近',
                  noRecentSearchesText: '暂无最近搜索',
                  saveRecentSearchButtonTitle: '保存此搜索',
                  removeRecentSearchButtonTitle: '从历史记录中移除此搜索',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除此搜索'
                },
                noResultsScreen: {
                  noResultsText: '未找到相关结果',
                  suggestedQueryText: '尝试搜索',
                  reportMissingResultsText: '认为此查询应该有结果？',
                  reportMissingResultsLinkText: '告诉我们。'
                }
              }
            }
          }
        }
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

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
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
