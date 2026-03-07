import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "付邦坤的网站",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Linux', link: '/linux/linux' }
    ],

    sidebar: [
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
