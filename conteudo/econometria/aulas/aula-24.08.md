---
title: "Aula 24.08 (laboratório)"
---

# Aula de econometria 24.08

::: tip
Dá uma olhada no [Math in markdown](https://github.com/cben/mathdown/wiki/math-in-markdown) pra descobrir um bom _transformer_ pra escrever equações no diário ufmg

O MathJax parece ser uma boa! Fraga o [guia de equações](http://csrgxtu.github.io/2015/03/20/Writing-Mathematic-Fomulars-in-Markdown/)
:::

## Anotações gerais

- 18 anos é considerado bastante tempo pra um modelo de dados em painel
- Efeito _between_ é muito fraco, Igor nem quis passar pra gente

## Anotações sobre o exemplo dos preços da gasolina

- Colunas do GASDATA:
  - `LN.Gas.Car` - log do consumo de gasolina por carro - **variável resposta**;
  - **Variáveis explicativas**:
    - `LN.Y.N` - log da renda per capta
    - `LN.Pmg.Pgdp` - log do preço médio da gasolina
    - `LN.Car.N` - log da frota per capta
- Nesses dados, faz sentido entender que existe um efeito fixo e estável ao longo do tempo pra esse consumo da gasolina
  - Pensar que pode ser uma infraestrutura diferente, cultura mais próxima do carro, etc.
  - Esse efeito estaria no resíduo, portanto
- :pointing-up_2: Por isso, faz sentido pensar que vamos rejeitar a presença de efeito aleatório, mas pra ter certeza vamos fazer o teste de Hausman

::: warning Esqueci o que são logs
Tenho que entender bem qual é a dos logarítmos
:::

## Anotações R

- Pacote `plm` do R: Panel linear model
- R tem linguagem orientada a objetos
  - **Aprender:** tentar pegar a vibe geral da linguagem de R sozinho
- Você pode declarar um objeto com `=` ou com `<-`
- Função `read.table` lê arquivos `.DAT`, `.csv`... 
  - O _default_ dela atribui `header = FALSE`, o que faz com que a primeira linha seja encarada como dados, e não cabeçalho. Se quiser adicionar cabeçalho, usa `header=TRUE` (ou `header=T`)
- No R, "\" também "escapa" o caractere... então os _paths_ têm que ter 2 `\\` pra evitar escapar o nome da pasta.
  - Exemplo: 
- Pra `help`, manda um `?(function)` no console.
- Os números devem seguir o modelo americano pra serem reconhecidos pelo R
- Depois de criar o objeto de dados, é necessário criar um novo objeto (No exemplo dele, `GSA_PANEL`) que é um objeto de dados em painel.
  - No exemplo: `GAS_PANEL <- pdata.frame(GAS, index = c("CO", "YR"))`, onde a função `c()` é _combine_, que cria um `array`...
  - Nesse código acima, então, criamos um índice que é um vetor com o país (`CO`) e o ano (`YR`)
- Separador ideal é `_` ou `.`
  - Exemplo: `GAS_PANEL`
- No R índices podem ser vetores, eles só vão ser convertidos em `\`${index[0]}-${index[1]}-(...)-${index[n - 1]}\``
- Tentar entender a função `names()`
- `plm()` é o efeito linear e recebe alguns argumentos, entre eles:
  - `formula` -> obrigatório
  - `data` -> obrigatório
  - `model` -> dar um `?plm` no console pra ver as opções
  - `effects` -> Igor ainda vai discutir isso mais na frente
- Ao rodar `summary(OBJETO)`, você recebe, obviamente, um resumo do objeto, com tudo que você precisa pra interpretar preliminarmente um modelo, com:
  - resíduos,
  - coeficientes,
  - painel balanceado,
  - r² e etc.
- Assim como no JS, `GAS.EF` vai criar uma propriedade `EF` no objeto `GAS`
- `as.factor()`: função pra criar dummies a partir de variáveis categóricas (basicamente, cria uns _enums_)
  - No exemplo `as.factor(CO)`, o R vai criar 1 variável do tipo `boolean` pra um país da série, na ideia do `isCountry`, mas na real ele vai retornar uma coluna `COUNTRY_NAME` só
  - Escolhe-se só uma dummy porque quando você tá criando o modelo MQO, existe um intercepto (beta 0)

## Atalhos R

- `run`: `CTRL + ENTER`
- Comentários se dão com `#`
- Você pode colapsar ou expandir um painel clicando num ícone no canto superior direito dele