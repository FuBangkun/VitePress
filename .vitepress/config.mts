import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "付邦坤的网站",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '开发环境', link: '/env/env' },
      { text: 'Git', link: '/git/git' },
      { text: 'Linux', link: '/linux/linux' }
    ],

    sidebar: [
      {
        text: '开发环境',
        items: [
          { text: '开发环境', link: '/env/env' },
          { text: '集成开发环境', link: '/env/ide' },
          { text: 'C/C++', link: '/env/cpp' },
          { text: 'Python', link: '/env/python' },
          { text: 'Rust', link: '/env/rust' },
          { text: 'Java', link: '/env/java' },
          { text: 'NodeJS', link: '/env/nodejs' },
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
        text: 'Linux',
        items: [
          { text: 'Linux', link: '/linux/linux' },
          { text: 'Arch Linux安装', link: '/linux/arch-install' },
          { text: '在Arch Linux上运行游戏', link: '/linux/game' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fubangkun/vitepress' }
    ]
  }
})
