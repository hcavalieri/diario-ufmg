---
title: "Aula 29.08"
---

# Aulas de econometria II de 29.08

::: danger Aprender
- qui-quadrado;
- teste t;
- estimador GMM (a "bazooka" que resolve tudo, segundo o professor);
:::

## Painel dinâmico

- Não tá no Gujarati e nem no Wooldridge
- "Painel" implica em $t$ pequeno e $n$ grande
- 1a proposta de painéis dinâmicos é de 1982
- é relevante porque $y_{i(t-1)}$ pode ser necessário para explicar algum modelo, como é o caso do exemplo da criminalidade (há uma inércia envolvida com a atividade criminal porque indivíduos têm dificuldade de sair dela)

$$ y_{it} = \phi y_{i(t-1)} + \varepsilon_{it}$$

<centered-italicized text="Onde o termo com y(t-1) é a defasagem do modelo)" />

No modelo tradicional ($x_{it}\beta + \alpha_i + \varepsilon_{it}$), $E(x_{it} \, \varepsilon_{is}) = 0 \; \forall \; s, t$

$y_{i(t-1)}$ é relacionado ao $\alpha_i$ porque o alfa explica ele mesmo... só se passar no Hausman para efeito aleatório e no LM para insignificância de $\alpha$ que pode-se tratar esse modelo normalmente.

Primeira diferença também não resolve porque variávle explicativa está correlacionada com o erro ($\varepsilon$) -> $E(\Delta y_{i(t-1)} \, \Delta \varepsilon_{ie}) \neq 0$ -> dependentes.

**Solução para isso: 2SLS** - Anderson e Hsiao (1982)

1. Tomar a 1a diferença;
1. Usar defasagens como instrumento -> "2 passos atrás" ($y_{i(t-2)}$)

_Problema dessa abordagem:_ ela não funciona com $t \leq 2$ e gera a perda de 2 graus de liberdade

-------

Exemplo:

$t = 3$

$\Delta y_{i3} = (y_{i3} - y_{i2}) = \beta_1(y_{i2} - y{i1}) + \Delta x_{i3} + \Delta \varepsilon_{i3}$

$\Delta y_{i2} = (y_{i2} - y_{i1}) = \beta_1(y_{i1} - \bold{\large{\color{red}{?}}}) + \Delta x_{i3} + \Delta \varepsilon_{i3}$

<centered-italicized text="Só dá pra fazer isso a partir de t3, porque t2 pra baixo faltam instrumentos devido ao baixo grau de liberdade." />

-------

::: tip Parêntesis
Em cenários de painel, é dificílimo ter $t$ grande, e, se tiver, o $t$ começa a definir o modelo, que começa a se comportar como séries temporais. Toda a literatura de dados em painel gira em torno de $t$ fixo e $n \rightarrow \infty$
:::

Num modelo de $t=4$, $y_{i2}$ pode ser usado como instrumento para a regressão de $y_{i4}$, mas não para $y_{i3}$, havendo a perda de informação relevante e aumento dos desvios padrão dos estimadores. É aí que entra a saca de _Apellano e Pond (1991)_ (melhor que Anderson e Hsiao para dinamicidade).

------

$E(y_{i2} \, \Delta \varepsilon_{i4}) = 0$

$E(y_{i1} \, \Delta \varepsilon_{i4}) = 0$ e $E(y_{i1} \, \Delta \varepsilon_{i3}) = 0$

------

Quanto + dinâmico (relativo a $y_{t - 2}$ pra baixo), + graus de liberdade você perde, mas a racionalidade é a mesma.

### Teste "overidentifying restrictions" (ou teste de sargan)

Testa a qualdiade dos instrumentos, com:

$H0$: conjunto de instrumentos é válido

$H1$: não exogeneidade dos instrumentos (correlação com erros, que acarreta em invalidade)

$\large{S \sim \Chi^2 _{m - k}}$ onde:
- $k$: número de variáveis endógenas;
- $m$: número de instrumentos
- $m \geq k$ -> se $m < k$, a qui quadrado tem 0 graus de liberdade