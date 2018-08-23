const inovacaoSidebar = {
  title: 'Inovação',
  collapsable: true,
  children: [
    '/economia-inovacao-industrial/',
    '/economia-inovacao-industrial/introducao',
    '/economia-inovacao-industrial/capitulo-2',
    '/economia-inovacao-industrial/capitulo-3',
  ],
};

const monografiaSidebar = {
  title: 'Monografia',
  collapsable: true,
  children: [
    '/monografia/',
    '/monografia/diario',
    '/monografia/bibliografia',
  ]
};

const themeColor= '#42b983';

module.exports = {
  title: "Diário UFMG",
  description: "Anotações, resenhas e aprendizados sobre o que vejo no curso de economia na UFMG",
  base: '/',
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/icons/icon-128x128.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'canonical', href: 'https://ufmg.henrique.codes' }],
    ['meta', { name: 'theme-color', content: themeColor }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/icon-152x152.png` }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/icons-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: themeColor }]
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'hcavalieri/diario-ufmg',
    repoLabel: 'Contribua :)',
    docsDir: 'conteudo/docs',
    editLinks: true,
    editLinkText: 'Edite essa página pelo GitHub',
    serviceWorker: {
      updatePopup: {
        message: "Tem novo conteúdo disponível.",
        buttonText: "Atualizar!",
      },
    },
    nav: [
      { text: 'Inovação industrial', link: '/economia-inovacao-industrial/' },
      { text: 'Monografia', link: '/monografia/' },
    ],
    sidebar: [
      inovacaoSidebar,
      monografiaSidebar,
    ]
  }
}