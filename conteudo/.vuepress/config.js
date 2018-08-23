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

module.exports = {
  title: "Diário UFMG",
  description: "Anotações, resenhas e aprendizados sobre o que vejo no curso de economia na UFMG",
  base: '/',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    repo: 'hcavalieri/diario-ufmg',
    repoLabel: 'Contribua :)',
    docsDir: 'conteudo/docs',
    editLinks: true,
    editLinkText: 'Edite essa página pelo GitHub',
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