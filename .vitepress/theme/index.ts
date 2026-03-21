
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute, inBrowser } from 'vitepress';
import './style/custom-block.css'
import '@bprogress/core/css';
import { BProgress } from '@bprogress/core';

export default {
    extends: DefaultTheme,

    setup() {
        const { frontmatter } = useData();
        const route = useRoute();

        giscusTalk({
            repo: 'FuBangkun/VitePress',
            repoId: 'R_kgDORg5VHQ',
            category: 'General',
            categoryId: 'DIC_kwDORg5VHc4C38mb',
            mapping: 'pathname',
            inputPosition: 'bottom',
            lang: 'zh-CN',
        },
            {
                frontmatter, route
            },
            true
        );
        
        if (inBrowser) {
            // 配置进度条
            BProgress.configure({
                showSpinner: false
            })

            // 路由切换前 → 开始进度条
            frontmatter.value.onBeforeRouteChange = () => {
                BProgress.start()
            }

            // 路由切换完成 → 结束进度条
            frontmatter.value.onAfterRouteChanged = () => {
                BProgress.done()
            }
        }
    }
}