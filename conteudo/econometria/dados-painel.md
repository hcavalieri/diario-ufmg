---
title: Dados em painel
---

# Dados em painel

São dados coletados para vários indivíduos ao longo do tempo, utilizados para medir efeitos específicos. Por mais que exista uma dimensão de tempo (_t_), a dimensão do número de indivíduos (_n_) deve ser consideravelmente maior pra ser considerada um modelo de dados em painel (_n > t_ - se t começa a crescer demais começo a precisar me preocupar com estacionariedade).

::: tip Adendo
**Painéis balanceados** (todos os indivíduos aparecem em todos os períodos de tempo) vs. **painéis desbalanceados** (alguns indivíduos desaparecem). Desbalanceados tão fora do escopo de econometria 2, mas é importante saber que eles podem ter um _desaparecimento aleatório_ ou _não aleatório_ (exemplo do _first come, first serves_ dos diretores de escola engajados que se inscrevem primeiro em programas).
:::

Em uma série desta natureza, nem todo indivíduo tem as mesmas características e, por isso, podem existir fatores individuais que alteram o nível da variável resposta. O exemplo dado em aula ilustra bem essa questão: se estivermos tentando entender o efeito do preço de insumos e quantidade produzida de uma firma sobre seu custo total, devemos levar em consideração sua capacidade instalada, _modos operandi_, e outros fatores que modificam seu ponto inicial. Para um dado preço e produção, uma firma A, mais eficiente, pode alcançar um custo total mais baixo que a B, e isso tudo é capturado na variável de nível $\aplha_i$.

Basicamente, ao invés de criar uma única reta que explique a trajetória de todos os indivíduos, igual se faria em um MQO tradicional, precisamos de retas individuais, com a mesma inclinação, já que queremos medir o efeito universal de uma variável sobre a resposta em uma amostra, mas com níveis diferentes ($\alpha_i \neq \alpha_j$). O gráfico (_maravilhoso_) abaixo serve pra ilustrar essa diferenciação:

![Gráfico de dados em painel](/econometria/dados-em-painel.JPG)

Isso tem implicações óbvias e qualidades desejáveis pra análise econômica, por exemplo, mas não pode ser feito com modelos tradicionais... é pra resolver isso que surgem a séries com dados em painel e seus respectivos modelos :wink:

Esse efeito individual dos agentes pode ou não ser correlacionado com _x_ (vetor com todas as variáveis endógenas individuais $X_{it}$):

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

### Estimador de efeitos fixos (_within_, mas também pode ser via dummy)

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

**Como escolher entre usar dummy ou within**: Se n for muito grande, dummy começa a ficar muito difícil de administrar e reduz o grau de liberdade (o que leva a uma significância mais fácil de rejeitar).

**Efeito _between_**: existe um $\varepsilon_t$ que afeta todos os _i_ de maneira homogênea, então você o remove de todos os indivíduos. Você pode fazer isso com dummy de tempo. (Confesso que não fraguei muito qual é a do between!)


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

Efeito aleatório é o mais robusto e eficiente deles (a "_bazooka_" nas palavras do professor), mas ele exige $E(\alpha_i \; x_{it}) = 0$. Se aceitamos a H0 do [teste de Hausman](#teste-de-hausman), então devemos partir pro teste de Breusch-Pagan.

## Quando usar qual modelo

$E(\alpha_i \; \x_{it})$

## Teste de _Hausman_

O teste de Hausman não se aplica só a painéis, mas quando este é o assunto, ele serve pra verificar se existe correlação entre o nível de um indivíduo $\alpha_i$ e suas variáveis endógenas $x_{it}$, podendo assim testar se deveríamos usar efeito fixo ou aleatório.

- **H0**: $E(\alpha_i \; x_{it}) = 0$
- **H1**: $E(\alpha_i \; x_{it}) \neq 0$
- **Conclusões do teste**:
  - EF funciona tanto pra H0 quanto pra H1.
  - EA só funciona pra H0
  - **Traduzindo**: se H1, usar o efeito fixo, se H0, dar preferência ao efeito aleatório por ser mais eficiente.

## Teste para presença de efeito não observável (Breusch-Pagan test)