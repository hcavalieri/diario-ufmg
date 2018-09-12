---
title: "Aula 12.09"
---

# Aula de econometria II do dia 12.09

Prova dia **28.09**

::: danger Aprender
- Equações simultâneas;
- SUR - _seemingly unrelated regressions_ (ou talvez "rationals"?) - talvez não caia;
- Progressão geométrica;
:::

- Modelo de equações simultâneas é muito vinculado a séries temporais.
  - não sei o que isso significa, mas o Igor vai passar a discutir séries temporais por agora

## Séries temporais

### Modelo de defasagens distribuídas

Capítulo 17 do Gujarati

Pra trabalhar com isso, tenho que estar dentro de um modelo de série temporal.

-------------

$$y_t = \alpha + \beta_0X_t + \beta_1X_{t-1} + \; ... \; + \beta_kX_{t-k} + \mu_t$$

<centered-italicized text="aqui é um mi, não um u" />

-------------

Deve existir uma estrutura de defasagem em que uma variável que deveria ser exógena, independente, afeta a variável resposta em vários períodos (exemplo do $\beta_1X_{t-1}$)

-----------

$$y_t = \alpha + \beta X_t + \gamma y_{t-1} + \mu_t$$

<centered-italicized text="Modelo autoregressivo" />

-----------

**Fundamental que o resíduo não seja auto-correlacionado**

Normalidade nem sempre é uma hipótese válida nos modelos. Ela é muito boa pra inferência em pequenas amostras, mas não podemos contar com ela...

------------

$\mu_t \sim (0, \sigma^2_u)$ -> ruído branco

(tem um iid em cima do sim aí em cima... e esse 0 na real é algum caractere que não fraguei)

------------

**Ruído branco:**
  - vem do _whitenoise_ de ondas de rádio;
  - são a gênese de todos os processos aleatórios no tempo;
  - dentro da teoria econômica, são os choques aleatórios.

![Gráfico de um ruido branco](/econometria/ruido-branco.jpg)

<centered-italicized text="Representação gráfica de um ruído branco" />

-------------

_Exemplo_: consumo vs. renda

$$y_t = \alpha + 0,4X_t + 0,3X_{t-1} + 0,2X_{t-2} + \mu_t$$

Onde $0,4X_t$ é o $\beta 0$ e etc.

$\beta_k = \large{\frac{\sigma y_t}{\sigma X_{t-k}}}$

$\beta_0$: multiplicador de curto prazo (efeito imediato)

-------------

Para cada período de tempo adicional, se mantivermos fixa a variação em $X_t$, digamos $\Delta X_{t-1} = 1$, o efeito será, para cada período:

-------------

$t: \, \beta_0$$

$t + 1: \, \beta_0 + \beta_1$

$t + 2: \, \beta_0 + \beta_1 + \beta_2$

(outros multiplicadores intermediários) ...

$t + k: \, \beta_0 + \beta_1 + \beta_2 + \; ... \; + \beta_k$

$= \sum_{i=0}^k \beta_k = \beta$ -> multiplicador final (de L.P.)

-------------

- Exemplo de um choque positivo de renda: o indivíduo ganha R$ 1000, gasta R$ 400 em $t_0$, e só alguns anos depois que vai terminar de gastar esse dinheiro.
- Indivíduo pode ter alta renda mas baixa riqueza, e vice versa, mas, na média, são altamente correlacionados.

O efeito final do choque é a soma dos betas

----------------

$y_t = \alpha + 0,4 X_t + 0,3 X_{t-1} + 0,2 X_{t-2} + \mu_t$

Na equação acima, o indivíduo vai gastar 40% no presente, 30% no período 1, e etc...

$x_{t-j}$, $j = 0, 1, 2$

Inicialmente a renda esperada dele era: $E(y_t) = \alpha$

----------------

Tabela assumindo que a pessoa recebeu um choque pontual de renda - _não_ é uma renda recorrente. Queremos avaliar como variações de renda HOJE vão influenciar o consumo futuro (a relação de defasagens), e qual é o efeito _final_ -> esse sistema vai voltar ao equilíbrio eventualmente, mas existe um choque aí. Exemplo dos choques de nível da taxa de crescimento no modelo de Solow.

| $t$ | $X_t$ | $X_{t-1}$ | $X_{t-2}$ | $E(y)$ |
|-----|-------|-----------|----------|------|
| 1 | 1 | 0 | 0 | $\alpha + 0,4$ |
| 2 | 1 | 1 | 0 | $\alpha + 0,4 + 0,3$ |
| 3 | 1 | 1 | 1 | $\alpha + 0,4 + 0,3 + 0,2$ |

A taxa de poupança estabilizou no longo prazo, com o choque final desse cenário sendo $\beta = 0,9$

----------------

$\beta_i^{*} = \large{\frac{\beta_i}{\sum_{i=0}^k \beta_i}}$ = participação de cada defasagem na variação total (peso)

No exemplo acima, $\beta_0$ teria um peso de 0,48 -> 48% do choque é devido ao consumo em $t_0$.

**Isso só faz sentido se todos os betas tiverem o mesmo sinal**. Caso eles não tenham o mesmo sinal, como é o caso da equação abaixo para nível de investimento macroeconômico:

$I_t = \alpha + \beta(y_t + y_{t-1}) + \mu_t$, onde $y_t + y_{t-1}$ é o $\Delta y_{t-1}$ (variação de PIB)

| $t$ | $y_t$ | $y_{t-1}$ | $\Delta y_t$ | $E(I_t)$ |
|-----|-------|-----------|----------|------|
| 1 | 2 | 1 | 1 | $\alpha + \beta$ |
| 2 | 2 | 2 | 0 | $\alpha$ |
| 3 | 2 | 2 | 0 | $\alpha$ |

Se eu não tiver constantes mudanças no PIB, não vou observar mudanças no investimento.

----------------

**Defasagens podem ter razões:**
- institucionais - exemplo: contratos;
- tecnológicas - exemplo: cenário em que o preço do trator fica mais barato: você não vai conseguir demitir tanta gente e comprar tanto trator no período 0, isso leva tempo;
- psicológicas - exemplo: confiança abalada de agentes numa empresa previamente falida mas que recebeu um aporte governamental.

#### Modelo de Koyck

"Imagina que eu tenho um modelo com estrutura de defasagens distribuídas dessa maneira aqui:"

$$y_t = \alpha + \beta_0X_t + \beta_1X_{t-1} + \; ... \; + \beta_kX_{t-k} + \mu_t$$

"Infinitas defasagens... isso é possível contanto que atenda a algumas hipóteses:"

##### Efeitos passados são cada vez menores - $\beta_k \rightarrow_{k \rightarrow \infty} 0$;
- Isso é possível matematicamente falando, mas dá pra gente cortar porque, eventualmente, eles passam a ser tão pequenos que podem ser negligenciados.
- Mas existe uma estratégia de identificar esse efeito sem a necessidade de estabelecer um ponto de corte:
- $\beta = \sum_{k=0}^{\infty} \beta_k \rightarrow \beta_k = \beta_0\lambda^k$ -> $\beta = \sum_{k=0}^{\infty} \beta_0\lambda^k$ = $\beta_0 \sum_{k=0}^{\infty} \lambda^k$
- Isso usa progressão geométrica

Multiplica-se a equação da primeira defasagem ($y_{t-1}$) e subtrai-se da equação presente ($y_t$), chegando a:

----------

$y_t = \alpha(1-\lambda) + \beta_0X_t + \lambda y_{t-1} + (\mu_t - \lambda\mu_{t-1})$, onde $(\mu_t - \lambda\mu_{t-1})$ é $v_t$ (não sei qual é o caractere certo aqui, é um vzinho)

Essa equação acima é equivalente à inicial. A partir dela, conseguimos estimar qualquer beta. É uma reconstrução do modelo para identificar os parâmetros de interesse.

Essa nova equação cria um resíduo auto-correlacionado ($E(v_t \, v_{t-1}) = 0$), mas isso não gera problema de inconsistência desde que você tenha uma exógena defasada (sei lá que que isso significa). O **problema dessa nova regressão** é que $\hat{\lambda} \nrightarrow \lambda$ (não sei que que isso significa). A saída para isso é estimar $v_t$ via 2SLS

----------