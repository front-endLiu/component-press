import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'front-endLiu',
  titleTemplate: '组件库 | API',
  description: '常用的API封装，依据ElementUI封装全局组件',
  lang: 'en-US',
  // 打包目录
  outDir: '../dest',
  base: '/component-press/',
  appearance: true,
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  plugins: [],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Utils', link: '/utils/' },
      { text: 'Api', link: '/api/' },
      { text: 'Component', link: '/component/' },
      { text: 'Blog', link: 'https://blog.csdn.net/chen548246' },
      { text: 'Github', link: 'https://github.com/front-endLiu' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'front-endLiu © 2022-present',
    },
    sidebar: {
      '/utils/': [
        {
          text: '工具类',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '工具', link: '/utils/' },
            { text: '防抖', link: '/utils/debounce' },
            { text: '节流', link: '/utils/throttle' },
          ],
        },
        {
          text: '导出类',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '防抖', link: '/utils/debounce' },
            { text: '节流', link: '/utils/throttle' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API封装',
          items: [],
        },
      ],
    },
  },
  lastUpdated: true,
  cleanUrls: 'without-subfolders',
});
