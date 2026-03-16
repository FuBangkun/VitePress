import { defineConfig } from 'vitepress'
import { generateSidebar } from "vitepress-sidebar";

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
      { text: '开发环境', link: '/env/index' },
      { text: 'Git', link: '/git/index' },
      { text: 'Linux', link: '/Linux/index' }
    ],

    sidebar: generateSidebar({
      documentRootPath: "/",
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      useFolderLinkFromIndexFile: true,
      sortMenusByFrontmatterOrder: true,
      sortFolderTo: "top",
      useTitleFromFrontmatter: true,
      collapsed: false,
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fubangkun/vitepress' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        }
      }
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
