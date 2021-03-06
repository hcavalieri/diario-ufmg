const inovacaoSidebar = {
  title: 'Inovação',
  collapsable: true,
  children: [
    '/economia-inovacao-industrial/',
    '/economia-inovacao-industrial/introducao',
    '/economia-inovacao-industrial/capitulo-2',
    '/economia-inovacao-industrial/capitulo-3',
    '/economia-inovacao-industrial/capitulo-4',
    '/economia-inovacao-industrial/capitulo-5',
    '/economia-inovacao-industrial/capitulo-6',
    '/economia-inovacao-industrial/capitulo-10',
  ],
};

const monografiaSidebar = {
  title: 'Monografia',
  collapsable: true,
  children: [
    '/monografia/',
    '/monografia/diario',
    '/monografia/bibliografia',
    '/monografia/tpe',
    '/monografia/problema-hipoteses',
  ]
};

const econometriaSidebar = {
  title: 'Econometria',
  collapsable: true,
  children: [
    '/econometria/',
    '/econometria/aprendendo-r',
    '/econometria/notacoes',
    '/econometria/conceitos-basicos',
    '/econometria/dados-painel',
    '/econometria/paineis-dinamicos',
    '/econometria/diff-diff',
  ]
};

const aulasEconometriaSidebar = {
  title: 'Aulas Econometria',
  collapsable: true,
  children: [
    '/econometria/aulas/aula-19.09',
    '/econometria/aulas/aula-12.09',
    '/econometria/aulas/aula-05.09',
    '/econometria/aulas/aula-31.08',
    '/econometria/aulas/aula-29.08',
    '/econometria/aulas/aula-24.08',
    '/econometria/aulas/aulas-22.08',
  ]
};

const themeColor= '#42b983';

module.exports = {
  title: "Diário UFMG",
  description: "Anotações, resenhas e aprendizados sobre o que vejo no curso de economia na UFMG",
  base: '/',
  markdown: {
    lineNumbers: true,
    config: md => {
      md.use(require('markdown-it-katex'));
    }
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
    ['meta', { name: 'msapplication-TileColor', content: themeColor }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }],
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'hcavalieri/diario-ufmg',
    repoLabel: 'Contribua :)',
    docsDir: 'conteudo',
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
      { text: 'Econometria', link: '/econometria/' },
      { text: 'Monografia', link: '/monografia/' },
    ],
    sidebar: [
      econometriaSidebar,
      aulasEconometriaSidebar,
      inovacaoSidebar,
      monografiaSidebar,
    ]
  }
}