---
title: "Painéis Dinâmicos"
---

# Painéis Dinâmicos

Eles são apenas um caso especial de dados em painel em que $y_{it}$ pode ser explicado, também, por $y_{i(t-1)}$ - por isso o nome "dinâmico": uma informação passada não é esquecida e afeta o presente. Esse é um tópico recente (1982) e ainda não tão consolidado na econometria e, por isso, sequer tá nos manuais passados até então.

-------

$y_{it} = \phi y_{i(t-1)} + \varepsilon_{it}$ - onde $\phi y_{i(t-1)$ é o termo de defasagem do modelo. **Nota:** a equação acima é simplificada e omite _x_ e $\beta_0$ pra facilitar o entendimento!

-------

No modelo tradicional ($x_{it}\beta + \alpha_i + \varepsilon_{it}$), mostrado na [página de dados em painel](/econometria/dados-painel.html), tínhamos que $E(x_{it} \; \varepsilon_{is}) = 0 \forall s, t$ - ou seja, as variáveis independentes do presente não estão relacionadas com o erro de nenhum outro tempo (o que não quer dizer que não estão relacionadas com o erro presente, que é justamente toda a falação que tivemos sobre efeito fixo e aleatório, relevância do $\alpha$, etc.).

No entanto, na equação exemplo de painel dinâmico, $y_{i(t-1)}$ está relacionado a $\alpha_i$ porque o alfa explica ele mesmo (não entendi muito bem isso, é anotação de aula)... só se o modelo passar em Hausman para efeito aleatório e no LM (Breusch-Pagan) para insignificância de $\alpha$ que podemos tratá-lo normalmente - e esse raramente é o caso!

Por outro lado, se tivermos efeito fixo, a primeira diferença também não vai resolver o problema de autocorrelação serial porque a variável explicativa tá correlacionada com o erro: $E(\Delta y_{i(t-1)} \; \Delta\varepsilon_{ie}) \neq 0$.

A solução para isso seria o **estimador 2SLS**!

## 2SLS - Anderson e Hsiao (1982)

Esse estimador foi o primeiro a lidar com painéis dinâmicos e é carregado de problemas, especialmente a questão da perda dos graus de liberdade: você dá 2 "passos atrás" pra conseguir acabar com essa autocorrelação serial e acaba perdendo eficiência do modelo. Ele funciona em 2 passos:

1. Tomamos a 1a diferença igual vimos em dados em painel;
1. Usamos as defasagens ($y_{t-1}$ e $y_{t-1}$) como instrumentos pra consertar o modelo.

-----

$$
\delta y_{i3} = (y_{i3} - y_{i2}) = \beta_1(y_{i2} - y_{i1}) + \Delta x_{i3} + \Delta\varepsilon_{i3}
$$

$\delta y_{i2} = (y_{i2} - y_{i1}) = \beta_1(y_{i1} - \large{\bold{\color{red}{?}}})$ - só podemos criar esse instrumento de segunda defasagem a partir de $t_3$!

-----

Novamente, o problema disso é que precisamos de um $t \geq 2$, e, mesmo assim, ele vai ser bem ineficiente. Como em dados em painel é dificílimo termos um t grande e, caso tivermos, ele começa a definir o modelo e passamos a nos preocupar com estacionariedade devido a um comportamento mais próximo de séries temporais, esse é um problemasso!

2SlS também sofre com **perda de informação**: por exemplo, num modelo com $t = 4$, você pode usar $y_{i2}$ como instrumento na regressão de $y_{i4}$, mas não na de $y_{i3}$, havendo perda de informação relevante e aumento dos desvios padrão dos estimadores (não me pergunte exatamente o porquê disso kkkk). A solução tá em **Apellano e Bond**.

## Apellano e Bond (1991)

Parte de Anderson e Hsiao e tentam melhorar as estimativas para dinamicidade, partindo do seguinte:

$E(y_{_i2} \; \Delta\varepsilon_{i4}) = 0$ -> não existe co-variância entre a resposta em $t = 2$ e a variação do erro em $t = 4$, ou seja, nesse modelo exemplo em específico a defasagem é de ordem 1 apenas.

$E(y_{_i1} \; \Delta\varepsilon_{i4}) = 0$ e $E(y_{_i1} \; \Delta\varepsilon_{i3}) = 0$

Quanto mais dinâmico for um modelo, mais graus de liberdade você vai perder, porque você deixa de ter esse $E(y_{_i2} \; \Delta\varepsilon_{i4}) = 0$, por exemplo, mas a racionalidade é a mesma: podemos, ao invés de usar instrumentos de 2 defasagens, (TENTAR ENTENDER, LEMBRO PICADO)

### Teste "overidentifying restrictions" (ou teste de Sargan)

Pelo que entendi, ele é um teste genérico que testa a qualidade dos instrumentos. Apellano e Bond usam isso pra ver se a gente pode evitar alguma defasagem e não precisar perder tanta informação e graus de liberdade.

- **H0:** conjunto de instrumento é válido
- **H1:** não exogeneidade dos instrumentos (autocorrelação com erros que leva à invalidade do modelo)

$S \sim \chi^2 _{(m - k)}$, onde:

- _k_: número de variáveis endógenas;
- _m_: número de instrumentos (as defasagens que cê vai incluir, no caso )
- $m \geq k$ - se $m \lt k$, a qui quadrado tem 0 graus de liberdade e aí deu ruim

ACHO QUE TEM MAIS COISA DE APELLANO E PAINEIS DINÂMICOS, MAS NÃO FRAGUEI!