import { h } from 'vue'
import type { Theme as ThemeConfig } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { useData, useRoute, useRouter, inBrowser } from 'vitepress'

import './custom-block.css'
import '@bprogress/core/css'
import { BProgress } from '@bprogress/core'

import { NolebaseInlineLinkPreviewPlugin } from '@nolebase/vitepress-plugin-inline-link-preview/client'
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'

import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

export const Theme: ThemeConfig = {
  extends: DefaultTheme,

  Layout: () => h(DefaultTheme.Layout, null, {
    'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
    'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
  }),

  enhanceApp({ app }) {
    app.use(NolebaseInlineLinkPreviewPlugin)
  },

  setup() {
    const { frontmatter } = useData()
    const route = useRoute()
    const router = useRouter()

    giscusTalk({
      repo: 'FuBangkun/VitePress',
      repoId: 'R_kgDORg5VHQ',
      category: 'General',
      categoryId: 'DIC_kwDORg5VHc4C38mb',
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
    }, { frontmatter, route }, true)

    if (inBrowser) {
      BProgress.configure({ showSpinner: false })
      
      router.onBeforeRouteChange = () => {
        BProgress.start()
      }
      router.onAfterRouteChange = () => {
        BProgress.done()
      }
    }
  }
}

export default Theme