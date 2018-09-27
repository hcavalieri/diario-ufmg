---
title: Dados em painel
---

# Dados em painel

São dados coletados para vários indivíduos ao longo do tempo, utilizados para medir efeitos específicos. Por mais que exista uma dimensão de tempo (_t_), a dimensão do número de indivíduos (_n_) deve ser consideravelmente maior pra ser considerada um modelo de dados em painel (_n > t_ - se t começa a crescer demais começo a precisar me preocupar com estacionariedade).

::: tip Adendo
**Painéis balanceados** (todos os indivíduos aparecem em todos os períodos de tempo) vs. **painéis desbalanceados** (alguns indivíduos desaparecem). Desbalanceados tão fora do escopo de econometria 2, mas é importante saber que eles podem ter um _desaparecimento aleatório_ ou _não aleatório_ (exemplo do _first come, first serves_ dos diretores de escola engajados que se inscrevem primeiro em programas).
:::

Em uma série desta natureza, nem todo indivíduo tem as mesmas características e, por isso, podem existir fatores individuais que alteram o nível da variável resposta. O exemplo dado em aula ilustra bem essa questão: se estivermos tentando entender o efeito do preço de insumos e quantidade produzida de uma firma sobre seu custo total, devemos levar em consideração sua capacidade instalada, _modos operandi_, e outros fatores que modificam seu ponto inicial. Para um dado preço e produção, uma firma A, mais eficiente, pode alcançar um custo total mais baixo que a B, e isso tudo é capturado na variável de nível $\aplha_i$. Esse alfa é a parte não observável do erro composto dessa série, sendo a segunda parte o $\mu_{it}$.

Basicamente, ao invés de criar uma única reta que explique a trajetória de todos os indivíduos, igual se faria em um MQO tradicional, precisamos de retas individuais, com a mesma inclinação, já que queremos medir o efeito universal de uma variável sobre a resposta em uma amostra, mas com níveis diferentes ($\alpha_i \neq \alpha_j$). O gráfico (_maravilhoso_) abaixo serve pra ilustrar essa diferenciação:

![Gráfico de dados em painel](/econometria/dados-em-painel.JPG)

Isso tem implicações óbvias e qualidades desejáveis pra análise econômica, por exemplo, mas não pode ser feito com modelos tradicionais... é pra resolver isso que surgem a séries com dados em painel e seus respectivos modelos :wink:

Esse efeito individual dos agentes pode ou não ser correlacionado com _x_ (vetor com todas as variáveis independentes $X_{it}$):

- Correlacionado: afeta ou é afetado por _x_. É o que chamamos de **efeito fixo**.
  - $\large{Plim\hat{\beta}^{OLS}_i = \beta + \frac{cov(x_{it}, \alpha_i)}{\sigma^2_x}}$
- Não correlacionado: **efeito aleatório**
  - $\large{Plim\hat{\beta}^{OLS}_i = \beta}$, o que seria desejável, afinal, sempre queremos que, no limite, nosso estimador corresponda ao valor observado, mas $\hat{\beta}^{OLS}$ é ineficiente
  - A ineficiência se dá devido à auto-correlação dos resíduos;

**A decisão sobre qual tipo de modelo usar** - o de efeito fixo ou aleatório - **depende desta relação entre $\alpha_i$ e $x_i$**, com a escolha influenciando na eficiência dos estimadores. Por exemplo, você sempre pode usar um MQOzão da massa e deixar na mão do _software_, mas muito provavelmente você vai acabar fazendo inferências bastante errôneas e ineficientes!

::: tip Porque usar EF/EA ao invés do MQO?
Tem um [vídeo de um britânico](https://www.youtube.com/watch?v=1SchyQ77VFg) que cobre _muito_ bem essa questão!

A raíz do problema é que o _pooled_ trata todas as observações como se fossem iguais, e isso pode incorrer numas bizarrices tipo um $\beta_1 < 0$ quando, na verdade, os indivíduos tão aumentando seu $Y$ ao longo do tempo.
:::

## Estimador de efeitos fixos (_within_, mas também pode ser via dummy)

Ele tem esse nome porque a gente olha o efeito de dentro do indivíduo, o que é diferente do efeito _between_ em que um $\varpsilon_t$ afeta todos os indivíduos de maneira homogênea ao longo de _t_.

A ideia do _within_ é que vamos eliminar tudo que é fixo sob o tempo. Lembrando que ele só pode ser usado se $\alpha_i$ for correlacionado com $x_{it}$ como vimos acima. Nesse caso, podemos também incorporar dummies de cada indivíduo e estimar por aí, mas mais a frente vamos ver como e quando usar cada modelo da melhor forma.

**Hipóteses**:

- $\alpha_i$   é correlacionado com $x_{it}$
- $E(x_{it} \; \mu_i) = 0$ (exogeneidade estrita)

**Como ele funciona**: Basicamente, vamos remover a média pra calcular a distância da média e centralizar as observações no plano (colocar em 0,0), igual ao gráfico abaixo, pra ter uma base comum entre eles que ignora o $\alpha_i$ e, então, a gente poder rodar um MQO nessa nova equação tratada. [Esse vídeo](https://www.youtube.com/watch?v=1SchyQ77VFg) (em inglês) ajuda pra caramba na visualização, recomendo!

![](/econometria/grafico-efeito-fixo.JPG)

1. $\bar{y}_i = \bar{x}_i\beta + (\alpha_i + \bar{\mu}_i)$, onde $\bar{y}_i$ é a média das observações de _i_
1. $y_{it} - \bar{y}_i = (x_{it} - \bar{x}_i)\beta + (\alpha_i - \alpha_i + \mu_{it} - \bar{\mu}_i)$
1. $\ddot{y}_{it} = \ddot{x}_{it}\beta + \ddot{\mu}_{it}$ - esses 2 pontinhos representam a distância da média. A média de $\ddot{y}_{it}$ é 0 porque é a distância da média, que na média é 0 já que y.

**Dá pra usar efeito fixo no efeito aleatório de $\alpha_i$** (quando $E(\alpha_i \; \x_{it}) = 0$ ou $cov(\alpha_i, x_{it}) eq 0$), mas o efeito aleatório sempre vai ser mais eficiente (isso é repetido mais a frente na hora de escolher qual modelo usar, mas vale reforçar). Se $E(\alpha_i \; \x_{it}) \neq 0$, não podemos usar MQO em hipótese alguma porque existe endogeneidade no modelo!

--------

**Como escolher entre usar dummy ou within**: Se _n_ for muito grande, dummy começa a ficar muito difícil de administrar e reduz o grau de liberdade (o que leva a uma significância mais fácil de rejeitar).

--------

**Efeito _between_**: no erro composto do modelo, existe um $\varepsilon_t$ que afeta todos os _i_ de maneira homogênea, então você o remove de todos os indivíduos. Você pode fazer isso com dummy de tempo e, ao meu entender, isso deveria acontecer com todas as equações... mas confesso que não entendi exatamente como a dummy de tempo ajuda nisso. A equação abaixo representa o erro composto:

$\vartheta_{it} = \alpha_i + \mu_{it} + \varepsilon_t$, onde $\varepsilon$ representa o efeito between - compartilhado entre todos os indivíduos ao longo do tempo.

## Estimador de primeira diferença

Ele é **outra forma de resolver o efeito fixo**, mas não é muito amado pelo professor porque, ao tirar a primeira diferença, você cria uma autocorrelação entre os estimadores e reduz o grau de liberdade do modelo. Existe uma explicação matemática pra isso mas não vou entrar nesses méritos.

1. $y_{it} = \beta_0 + \beta_1x_{it} + \alpha_i + \mu_{it}$ (ainda não entendi porquê o $\mu$ é a letra usada pro erro nesse modelo...)
1. $y_{it} - _{i(t-1)} = \beta_1x_{it} - \beta_1x_{i(t-1)} + \mu_{it} - \mu_{i(t-1)}$
1. $\Delta y_{it} - \beta_1\Delta x_{it} + \Delta \mu_{it}$

::: danger Diferenciação entre within, dummy e PD
A primeira diferença, dummy e within começam iguais (com mesmas estimativas) em t = 2, já que os 3 modelos se mantém com o mesmo grau de liberdade, mas a partir daí, como a primeira diferença joga fora 1 observação de _t_, eles só voltam a se aproximar com _t_ muito grande, em que essa perda de grau de liberdade é negligenciável.

A escolha entre dummy e within a gente já falou que depende de _n_, e a escolha entre alguma dessas duas e PD ainda não frago!
:::

## Efeito aleatório (ou GLS - _general lesser square_)

**Em suma:** Efeito aleatório é o mais robusto e eficiente deles (a "_bazooka_" nas palavras do professor, pelo fato de tratar da variância do erro), mas ele exige $E(\alpha_i \; x_{it}) = 0$. Se aceitamos a H0 do [teste de Hausman](#teste-de-hausman), então devemos partir pro [teste de Breusch-Pagan](#teste-para-presenca-de-efeito-nao-observavel-breusch-pagan-test) pra ver se usamos EA ou pooled.

::: tip Vídeos potencialmente relevantes
- [Random Effects Estimator - an introduction](https://www.youtube.com/watch?v=bQampZBzU9Q)
- [How does Random Effects work?](https://www.youtube.com/watch?v=EbdBHJYbOrg)
- [Random Effects vs Fixed Effects estimators](https://www.youtube.com/watch?v=weylnmScboA)
:::

Quando se tem exogeneidade estrita de alfa e variáveis independentes (denovo, $E(\alpha_i \; x_{it}) = 0$), um _pooled_ com MQO é totalmente válido (assim como PD e EF) e vai produzir um estimador consistente - o que pode ser representado por $\hat{\beta}_{OLS / PD / EF} \rightarrow \beta$, mas isso não é o mais eficiente. Os problemas de cada um são:

- Primeira diferença: ao tirar a primeira diferença e utilizar $\Delta y$ na análise, cria-se uma autocorrelação dos erros;
- Dummy: tirar um grau de liberdade é pior pro modelo;
- Within: não consegue estimar os efeitos por tirar a média e sumir com o efeito. Ao normalizar todo mundo, você perde a capacidade de análise do _modus operandi_, por exemplo.
- MQO _pooled_: quando você faz a covariância do erro composto entre dois períodos _t_ e _s_ $cov(\vartheta_{it},\vartheta_{is}) = cov(\alpha_i+\mu_{it} , \alpha_i + \mu_{is}$ (aqui já tamo excluindo o efeito _between_ do $\varepsilon_t$ :wink:), o resultado vai ser $V(\alpha_i)$ (caminho pra chegar nisso abaixo), o que necessariamente é maior que 0. Se a co-variância dos erros em diferentes momentos não é nula, temos, então, que esse modelo sofre de autocorrelação dos resíduos. Isso não invalida o estimador, mas torna ele bem mais ineficiente do que se fosse efeito aleatório.

### Como fazer o estimador GLS

Primeiro, a gente começa investigando a co-variância dos erros de um modelo _pooled_ em _t_ e _t - s_:

1. $E(\vartheta^{OLS}_{it} \; \vartheta^{OLS}_{i(t-s)}) = E[(\alpha_i+\mu_{it})(\alpha_i+\mu_{is})]$
1. $E[\alpha^2_I+\mu_{it}\alpha_i + \alpha_i\mu_{i(t-s)}+\mu_{it}\mu_{i(t-s)}] = E[\alpha^2_i]$, já que $\mu_i$ é um ruído branco cuja esperança é 0;
1. $cov(\vartheta^{OLS}_{it} \; \vartheta^{OLS}_{i(t-s)}) = \sigma^2_{\alpha}$

Então, fazemos a **transformação RE (random error)**, que junta as seguintes equações:

- $y_{it} = x_{it} + \alpha_i + \mu_{it}$
- $\lambda = 1 - \large{(\frac{\sigma^2_{\mu}}{T\sigma^2_\alpha + \alpha^2_\mu})^{\frac{1}{2}}}$
  - Esse lambda é um ponto central pro efeito aleatório: ele é um "ponderador" que adicionamos à equação pra testar a existência e relevância do efeito aleatório.
  - Quanto mais relevante for o $\alpha$, mais próximo lambda chega de 1, ponto em que precisamos necessariamente incluir o efeito aleatório na nossa análise.
  - Como vamos ver mais pra frente, se esse lambda tender a 0, é sinal que o efeito aleatório não é relevante o suficiente pra afetar o modelo... Nesse caso, podemos só usar um _pooled_ basicão e tá resolvido!
  - No entanto, essa análise do lambda só pode vir depois que rodarmos o teste de Hausman pra identificar se o efeito é fixo ou aleatório. Se for fixo, nem vamos precisar preocupar com esse lambda :wink:
- $\lambda\bar{y}_i = \lambda\bar{x}_i\beta+\lambda\bar{\vartheta}_i$

Subtraindo $\lambda\bar{y}_i$ de $y_{it}$ chegamos a: $\bold{\hat{\sigma}^2_\vartheta = \hat{\sigma^2}_\mu + \hat{\sigma^2}_\alpha}$. Devemos, então, mandar um MQO simples (acho que é na equação toda) e usar os resíduos pra estimar o $\hat{\sigma}^2_\vartheta$, que vai dar uma informação temporal pra identificar $\hat{\sigma^2}_\alpha$, que é usado pra calcular lambda lá na frente no Breusch Pagan.

## Teste de _Hausman_

O teste de Hausman não se aplica só a painéis, mas quando este é o assunto, ele serve pra verificar se existe correlação entre o nível de um indivíduo $\alpha_i$ e suas variáveis independentes $x_{it}$, podendo assim testar se o efeito é fixo ou aleatório. Ele é um **teste de comparação de estimadores**, que parte das seguintes hipóteses:

- **H0**: $E(\alpha_i \; x_{it}) = 0$
- **H1**: $E(\alpha_i \; x_{it}) \neq 0$
- **Conclusões do teste**:
  - Com H0, todos os estimadores são consistentes (super exogeneidade master).
  - Se aceitamos H0, temos que o efeito é aleatório, mas não temos certeza se devemos usar o GLS ou o _pooled_, precisamos fazer o teste Breusch-Pagan pra ver qual é mais eficiente.
  - Estimadores de efeito fixo continuam consistentes com H0, mas menos eficientes
  - **Resumindo**: se H1, usar o efeito fixo, se H0, dar preferência ao efeito aleatório ou _pooled_ por serem mais eficientes.

O teste de Hausman parte de $H = (\hat{\beta}^{EF} - \hat{\beta}^{EA})'$ (esse tracinho representa uma matriz), onde $\hat{\beta}$ é a diferença vetorial dos estimadores (basicamente representa vários estimadores, deixa a matriz pra lá kkkk). Pelo que entendi, ele faz uma análise matricial dos estimadores construídos via _within_ e via GLS, e isso retorna uma um valor com distribuição qui-quadrado que pode ser significativo ou não. Quanto maior esse valor, mais próximo o teste tá de rejeitar H0. Considerando dados em painel, se esse valor estiver próximo ou acima de 25, é sinal que muito provavelmente o teste foi rejeitado.

## Teste para presença de efeito não observável (Breusch-Pagan test)

O Breusch-Pagan (ou teste L.M. - LaGrange multiplier) testa pooled ou EA vendo se o ponderador (lambda) é necessário ou não. Basicamente, ele verifica se $\alpha_i$ é relevante. Se não for, pooled é mais eficiente porque consegue remover $\alpha_i$ do modelo, que fica mais enxuto e não "engorda a variância" igual ao EA, que se defende pra tudo que é caso. Isso não é tão relevante se _n_ for muito grande!

Hipóteses:

- **H0**: $\sigma^2_\alpha = 0$ -> pooled
- **H1**: $\sigma^2_\alpha > 0$ -> E.A.
- **Conclusões do teste**:
  - Na real cê pode usar os dois, é uma questão de eficiência.

## Sumário sobre qual modelo escolher

![](/econometria/diagrama-testes-painel.jpeg)