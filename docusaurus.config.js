const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const TwitterSvg =
  '<svg style="fill: #1DA1F2; vertical-align: middle;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>';

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Cloud Catalyst',
  tagline: 'Act as a cloud catalyst',
  url: 'https://ddii.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'ddiiwoong',
  projectName: 'newblog',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  // i18n: {
  //   defaultLocale: "ko",
  //   locales: ["ko"],
  // },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/ddiiwoong/newblog/tree/main',
        },
        gtag: {
          trackingID: 'G-4ZT898XDT2',
          anonymizeIP: true,
        },
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          editUrl:
            'https://github.com/ddiiwoong/newblog/tree/main',
            blogTitle: 'Cloud Catalyst',
            blogDescription: 'My little thought may as a catalyst in other engineer\'s career',
            postsPerPage: 5,
            blogSidebarTitle: 'Recent Posts',
            blogSidebarCount: 5,
            onUntruncatedBlogPosts: 'ignore',
            feedOptions: {
              type: 'all',
              title: 'Act as a catalyst',
              description: 'Act as a cloud catalyst',
            },
          },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {},
      }),
    ],
  ],
  plugins: ['docusaurus-plugin-google-adsense'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        additionalLanguages: ['powershell'],
      },
      metadata: [
        {name: 'naver-site-verification', content: 'cbcc03783e5594725d3951f4e7f16ede80e69881'}
      ],
      googleAdsense: {
        dataAdClient: 'ca-pub-4362752107119680',
      },
      algolia: {
        appId: 'UTLA0DRN66',
        apiKey: 'f04922856dcd61505849b49a5bba97d8',
        indexName: 'ddii',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Algolia search parameters
        searchParameters: {},

        //... other Algolia params
        searchPagePath: 'search',
      },
      navbar: {
        title: 'Cloud Catalyst',
        hideOnScroll: true,
        logo: {
         alt: 'Cloud Catalyst',
         src: 'img/logo-catalyst.svg',
        },
        items: [
          {to: '/', label: 'Posts', position: 'left'},

          {
            type: 'dropdown',
            to: 'docs/Prometheus/introduction',
            docId: 'introduction',
            position: 'left',
            label: 'Docs',
            items: [
              {to: 'docs/Prometheus/introduction', label: 'Prometheus'},
            ],
          },
          {
            to: 'tags',
            label: 'Tags',
            position: 'right',
          },
          {to: 'presentation', label: 'Presentation', position: 'right'},
          {to: 'archive', label: 'Archive', position: 'right'},
          {to: 'about', label: 'About', position: 'right'},
          {to: 'pang4u', label: 'Pang4u', position: 'right'},
          {
            href: 'https://github.com/ddiiwoong/newblog',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Blog',
            items: [
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'Archive',
                to: 'archive',
              },
              {
                label: 'Tags',
                to: 'tags',
              },
            ],
          },
          {
            title: 'Sponsors',
            items: [
              {
                label: 'Pang4U',
                to: 'pang4u',
              },
              {
                label: 'Buy Me a Coffee',
                href: 'https://ko-fi.com/ddiiwoong',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ddiiwoong',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/ddiiwoong',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/ddiiwoong',
              },
              {
                label: 'LinkedIn',
                href: 'https://kr.linkedin.com/in/ddiiwoong',
              },
            ],
          },
        ],
        //copyright: `Copyright © ${new Date().getFullYear()} Cloudy with a chance of Big Data.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
