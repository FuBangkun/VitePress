
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import './style/custom-block.css'

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
    }
}