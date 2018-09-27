---
title: "Aula 19.09"
---

# Aula de econometria II do dia 19.09

**O que vamos discutir em séries temporais**

- Modelo ARIMA
  - Processo ARMA - modelos autoregressivos e de médias móveis
  - Processo de raízes unitárias
- Sazonalidade
  - A economia sofre bastante com sazonalidade, me parece que o professor vai ter uma atenção grande pra isso
- Vetores autorregressivos
- Causalidade
- Cointegração

Todos esses conceitos acima (com exceção da sazonalidade) são dependentes do conceito de _estacionariedade vs. não estacionariedade de séries_.

## A _estacionariedade_

Quando você tem uma estrutura de séries temporais, a natureza dos seus dados é diferente. Por mais que painéis tenham uma dimensão temporal, ela é curta demais pra gente precisar se preocupar com a passagem do tempo ($n \rightarrow \infty$). Com séries temporais, $t \rightarrow \infty$, e isso tem implicações importantes.

A ideia é que você tem uma trajetória, um caminho, que estabelece uma relação de dependência entre as observações no tempo. Isso, por definição, viola a _exogeneidade estrita_ ($y_t$ está relacionado com o erro de $y_{t-1}$). O que tenho, é uma _exogeneidade contemporânea_

Em painel, exogeneidade contemporânea não é suficiente e preciso de instrumentos pra resolver isso, mas isso porque n tende ao infinito e é consideravelmente maior que t. (não entendi isso lá muito bem)

::: tip
**exogeneidade estrita:** $cov(y_t,\varepsilon_{t-k}) = 0 \; \forall \; k$

**exogeneidade contemporânea:** (tenho que lembrar porque perdi a anotação)

**Modelo ARMA**:
:::

------------

"Quando você tá lidando com séries temporais, frequentemente as pessoas fazem regressões de variáveis que evoluem no tempo, sem necessariamente conhecer o conceito de estacionariedade. Quando você faz isso, você pode tá fazendo um modelo que não tem o menor sentido, a chamada regressão espúria"

**regressão espúria:** regressão com 2 variáveis independentes ao longo do tempo que traz um $\beta$ significativo mas não tem valor nenhum em questões de análise
  - $Y_t = \alpha_0 + \beta_t + \varepislon_t$
  - $X_t = \beta_0 + \beta_{1t} + n_t$
  - Os termos de erro têm variância constante e esperança = 0, flutuando ao redor da tendência da sua própria variável explicativa ($\beta_0$, por exemplo).
  - Esses termos de erro são independentes e, por isso, $Y$ e $X$ são independentes.
  - Se você tem variáveis independentes, **do que vale tentar criar uma regressão entra elas?** Nada! Elas podem ter correlação mas nunca uma relação de causalidade :wink:

------------

Uma série tem de atender a algumas condições para ter _estacionariedade fraca_:

- $E(Y_t) = \mu < \infty$
- $V(Y_t) = \gamma_0 < \infty$
- $cov(Y_t \, , \, Y_{t-k}) = E[(Y_t - \mu) \; (Y_{t-k} - \mu)] = \gamma_k$
  - em que $\gamma_k < \infty$, $\gamma_k \rightarrow 0$ se $k \rightarrow \infty$
  - $\gamma_k$ só depende da distância entre as observações e não do ponto do tempo em si.
    - O impacto de uma observação passada só depende da distância em relação ao tempo presente. Analisar ago/17 e set/17 é a mesma coisa que ago/18 e set/18 para os efeitos de $\gamma_k$ (_autocovariância_).

**O que isso significa:**
  - Uma série estacionária é, basicamente, estável ao redor da média e com tendência de se manter constante.
  - para existir _estacionariedade fraca_, a esperança de uma série deve ser constante, sua volatilidade (variância) deve ser constante (tendência a retornar / convergir para a média, justamente porque ela é estacionária).
  - com a 3° condição, queremos dizer que quanto maior o $k$, menos relevante é a covariância entre $Y_t$ e $Y_k$ (menor o impacto do tempo $k$ sobre o resultado do tempo $t$), com o ápice disso sendo cov = 0 com $k \rightarrow \infty$.


"Quem usa a estacionariedade forte são outros campos da ciência que não o nosso." Em economia, quase todas as séries não são estacionárias e, por isso, devemos tentar erradicá-la.

Mudanças no processo gerador de dados podem mudar a natureza da série. Políticas públicas tentam agir justamente sobre esse processo. Exemplo: plano real modificando o comportamento da inflação.

------------

**Autocorrelação**: correlação entre o fenômeno que tô estudando e ele mesmo, só que em tempos passados ($k$ passos atrás).

**Séries temporais precisam de t grande**. Por isso é tão problemática a avaliação de políticas econômicas no Brasil.

## Ruído branco

$\varepsilon_t$ é um ruído branco se $E(\varepsilon_t) = 0$, $V(\varepsilon_t) = \sigma^2$ e $\gamma_k = 0 \; \forall \; k (diferente de) 0$. Em geral assume-se normalidade.

Ruído branco é (alguma coisa, acho que "parte") de todos os processos estocásticos. Uma série nunca vai ser "lisinha", ela têm pequenas variações aleatórias representadas pelo ruído branco. **O efeito aleatório de variação de uma série sempre vai ser o ruído branco OU função do resíduo branco**.

Processo muito puro, com nenhuma influência do passado.

Jeitos de verificar se o resíduo é ruído branco:
- calcular as covariâncias em todos os _t_ e observar se a H0 de que $\gamma_k = 0$ é estatisticamente relevante.
- analisar graficamente.

## Exemplo: inflação

$\Pi_t = \phi\Pi_{t-1} + \varepsilon_t$ ($\Pi$ é um $\pi$ maiúsculo)

Substituindo $\Pi_{t-1}$ na equação: $\Pi_t = \phi^2\Pi_{t-2} + \phi\varepsilon_{t-1} + \varepsilon_t$.

Transformando isso em uma regra: $\Pi_t = \sum^\infty_{k=0} \, \phi^k \varepsilon_{t-k}$

A série só vai ser estacionária se $|\phi| < 1$, mas dá pra perceber isso sem conta nenhuma se pensarmos que, caso o efeito seja > ou = 1, o efeito de $\Pi_k$ sempre vai estar contido em $\Pi_t$. Com $|\phi| < 1$ sabemos que, eventualmente, esse $\Pi_k$ perde seu efeito sobre o presente.

$V(\Pi_t) = V(\sum^\infty_{k=0} \, \phi^k \varepsilon_{t-k}) = \sigma^2_\varepsilon \sum^\infty_{k=0} \, \phi^{2k} = \sigma^2_\varepsilon / (algo)$