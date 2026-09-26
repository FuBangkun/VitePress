import {h} from 'vue'
import type {Theme as ThemeConfig} from 'vitepress'
import {inBrowser, useRouter} from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './custom-block.css'
import '@bprogress/core/css'
import {BProgress} from '@bprogress/core'

import {NolebaseInlineLinkPreviewPlugin} from '@nolebase/vitepress-plugin-inline-link-preview/client'
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

    enhanceApp({app}) {
        app.use(NolebaseInlineLinkPreviewPlugin)
    },

    setup() {
        const router = useRouter()

        if (inBrowser) {
            BProgress.configure({showSpinner: false})

            router.onBeforePageLoad = () => {
                BProgress.start()
            }
            router.onAfterPageLoad = () => {
                BProgress.done()
            }
        }
    }
}

export default Theme
