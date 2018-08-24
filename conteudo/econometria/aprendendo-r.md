---
title: Aprendendo a mexer com o R
---

# Aprendendo a mexer com o R

## Noções básicas

- R tem linguagem orientada a objetos
- Você pode declarar um objeto com `=` ou com `<-`
- Pra `help`, manda um `?(function)` no console.
- No R, "\" também "escapa" o caractere... então os _paths_ têm que ter 2 `\\` pra evitar escapar o nome da pasta.
- Os números devem seguir o modelo americano pra serem reconhecidos (trocar utilização do ponto por vírgula)
- Separador ideal pra nome de variável é `_` ou `.`
  - Exemplo: `GAS_PANEL`
- Índices podem ser vetores (`arrays`), eles só vão ser convertidos em `strings` do tipo ``\`${index[0]}-${index[1]}-(...)-${index[n - 1]}\``
- [**INCERTO**] Assim como no JS, `GAS.EF` vai criar uma propriedade `EF` no objeto `GAS`

## Atalhos

- `run`: `CTRL + ENTER`
- Comentários se dão com `#`
- Você pode colapsar ou expandir um painel clicando num ícone no canto superior direito dele

## Funções e pacotes

O R tem seu próprio _package manager_ (tipo NPM, mas 0 frago quem mantém a parada) com diversos pacotes para diversas finalidades.

::: tip Dica
Lembrando que você pode ler a documentação de cada função jogando no console `?FUNCTION_NAME`: vai abrir uma janela de ajuda com todos os parâmetros e uma descrição da função :wink:
:::

### Funções básicas

- Função `read.table` lê arquivos `.DAT`, `.csv`...
  - O _default_ dela atribui `header = FALSE`, o que faz com que a primeira linha seja encarada como dados, e não cabeçalho. Se quiser adicionar cabeçalho, usa `header=TRUE` (ou `header=T`)
- Se for trabalhar com dados em painel, depois de criar o objeto de dados, é necessário criar um outro (no exemplo dele, `GSA_PANEL`) que para os dados em painel com a função `pdata.frame`.
  - No exemplo: `GAS_PANEL <- pdata.frame(GAS, index = c("CO", "YR"))`, onde a função `c()` é _combine_, que cria um `array`...
  - Nesse código acima, então, criamos um índice que é um vetor com o país (`CO`) e o ano (`YR`)
- Tentar entender a função `names()`
- Ao rodar `summary(OBJETO)`, você recebe, obviamente, um resumo do objeto, com tudo que você precisa pra interpretar preliminarmente um modelo, com:
  - resíduos,
  - coeficientes,
  - painel balanceado,
  - r² e etc.
- `as.factor()`: função pra criar dummies a partir de variáveis categóricas (basicamente, cria uns _enums_)
  - No exemplo `as.factor(CO)`, o R vai criar 1 variável do tipo `boolean` pra um país da série, na ideia do `isCountry`, mas na real ele vai retornar uma coluna `COUNTRY_NAME` só
  - Escolhe-se só uma dummy porque quando você tá criando o modelo MQO, existe um intercepto (beta 0)


### Pacote PLM (Panel Linear Model)

Usado pra séries temporais

- `plm()` é o efeito linear e recebe alguns argumentos, entre eles:
  - `formula` -> obrigatório
  - `data` -> obrigatório
  - `model` -> dar um `?plm` no console pra ver as opções
  - `effects` -> Igor ainda vai discutir isso mais na frente
- Pra fazer os diferentes tipos de modelos (efeito fixo, efeito aleatório, primeira diferença, e pooled), basta criar novos objetos gerados pela `plm()` em que vamos mudar o argumento `model` ;)
- `phtest()`: **Teste de Hausman** contido no pacotem `plm`
  - P-value baixo -> Região de rejeição da Nula e evidência à favor do EF
- `pFtest()`: Teste contra o efeito fixo pra testar EF vs. _Pooled_
  - Região de rejeição da Nula e evidência à favor do _Pooled_