---
title: "Aula 05.09"
---

# Aula de econometria II do dia 05.09

::: danger Aprender
- interpretar saída de modelo no R -> **ele vai cobrar isso na prova**
:::

- Hausman é um teste de comparação entre estimadores.
- Existem outros teste e ferramentas que avaliam relações de tratamento vs. controle (como políticas públicas, por exemplo) para além de Diff 'n Diff, mas não entram em econometria II
- $T_i$ é dummy de tratamento, $t_i$ é dummy de tempo
- Viés de seleção (ou _selection bias_): mecanismos de seleção contaminados por viés (não aleatórios). Exemplo: o _first come first serve_ para um programa escolar em que as escolas que chegarão primeiro serão aquelas em que os diretores já são mais empenhados.

------

$E(y_0^T) = \alpha + \beta$ -> tratados antes do tratamento

$E(y_1^T) = \alpha + \beta + \bold{\color{red}{\gamma + \delta}}$ -> tratados depois do tratamento

<centered-italicized text="Existem 2 novos parâmetros depois do tratamento, mas só queremos estimar 1 deles. Nota: as equações acima são uma versão simplificada, que exclui x e etc." />


$E(y_0^C) = \alpha$ -> controle antes do tratamento

$E(y_1^C) = \alpha + \color{red}{\gamma}$ -> controle depois do tratamento

<centered-italicized text="Ganhou só ganhou a tendência (o gamma), enquanto tratamento tem a diferença de níveis (beta) e o efeito do tratamento (delta)" />

<centered-italicized text="Esses T e C em cima dos y representa tratamento ou controle ;)" />

------

- Esse $\beta$ é comum a todos os tratados. As diferenças de níveis individuais entre os tratados são removidas no efeito fixo (ainda não entendi exatamente como isso se dá ou se é verdade, mas sei que assumimos uma diferença nível $\beta$ comum a todos os tratados em relação ao grupo de controle).
  - Esse $\beta$ é "identificado a partir de uma dummy" - não sei o que isso significa
  - Segundo o Igor, quando perguntei sobre as diferenças de níveis DENTRO do grupo de tratamento, ele disse que, em geral, não se preocupa muito com efeito fixo nesses casos de diff 'n diff.

------

$\hat{\delta}_1 = y_1^T - y_0^T$ -> regressão só nos tratados com dummy de tempo

$E(\hat{\delta}_1) = E(y_1^T) - E(y_0^T)$

$E(\hat{\delta}_1) = (\alpha + \beta + \gamma + \delta) - (\alpha + \beta)$

$E(\hat{\delta}_1) = \gamma + \delta$ -> o $\gamma$ representa a tendência, implicando em viés

------

Se fizermos uma regressão só nos tratados, usando uma dummy de tempo para verificar o efeito de um choque (programa de distribuição de renda, por exemplo), ainda estaremos incluindo $\gamma$, que representa a tendência da amostra e implica em **viés de qualquer análise a partir dessa regressão**. Basicamente, estaremos caindo no erro que a mídia frequentemente cai de atribuir o efeito de uma tendência à existência de um choque: "Após a implementação do programa, escolas observaram uma redução de 30% na evasão", quando, na verdade, parte desses 30% são por conta de um histórico/tendência de queda anterior.

A solução, portanto, é incluir os tratados na regressão p/ remover essa tendência (tratados também têm tendência :wink:)

------

$\hat{\delta}_2 = y_2^T - y_1^C$ -> não tratados entram para tirar tendência

$E(\hat{\delta}_2) = E(\bar{y}_2^T) - E(\bar{y}_1^C)$

$E(\hat{\delta}_2) = \beta + \delta$

<centered-italicized text="Conseguimos remover a tendência, mas a diferença dos níveis (viés de seleção) - o beta - aparece porque ele não existia entre o grupo de controle." />

<centered-italicized text="Por isso, ainda não conseguimos isolar o estimador do choque (delta)" />

------

Para isolar o $\delta$ por completo, devemos, então, fazer a diferença em diferença de $\delta$ ($\hat{\delta}_{DD}$) - essa notação representa diferenças em diferenças, com a dummy do grupo de tempo interação entre elas - não faço ideia o que isso quer dizer, só anotei)

------

$\hat{\delta}_{DD} = (\bar{y}_1^T - \bar{y}_0^T) - (\bar{y}_1^C - \bar{y}_0^C)$

$E(\hat{\delta}_{DD}) = [(\alpha + \beta + \gamma + \delta) - (\alpha + \beta)] - [(\alpha + \gamma) - \alpha] = \large{\bold{\delta}}$

------

**Hipótese assumida por diff 'n diff:** tendência comum -> caso haja tendências diferentes controlar por identificadores de tendência individuais (não entendi as consequências disso, e na real tem um modelo de diff 'n diff que trabalha sem tendência comum, mas não tá no escopo da aula)

Se não existe viés de seleção, os indivíduos são homogêneos e $\beta = 0$... mas isso é virtualmente impossível na economia e em uma série de áreas em que se estudam estes choques.

Para verificar tendência comum (_common trend_), verificamos a inclinação da tendência no gráfico.

-------

![Gráfico de controle vs. tratamento](/econometria/grafico-controle-tratamento.jpg)

No gráfico acima, temos a diferença entre o grupo de tratamento (T, em roxo) e o de controle (C, em verde). O $\beta$ é a diferença de níveis entre os grupos, o $\gamma$ é a inclinação de ambas as curvas sem o choque, que representa a tendência e a diferença entre a curva contra-factual do grupo de tratamento (pontilhada) e a factual (que acontece, de fato, após o tratamento) é o efeito isolado do choque, que queremos estimar, representado por $\delta$." />

-------

::: warning Nota
Buguei um pouco com a questão do $\beta$ em relação entre diferente níveis dos agentes... Professor "eu posso ter uma estrutura de dados em que não posso criar um grupo de controle com essas características"
- Regressão descontínua cobre isso, mas ela não entra em Econometria II
  - ela usa indivíduos na borda do corte para compor um grupo de controle -> exemplo da renda de até R$ 1.200 e indivíduo com R$ 1.210 não estando no programa mas sendo muito parecido. Com isso, _não é necessário dados em painel_
  - Exemplo da implementação das urnas eletrônicas segundo tamanho de cidades
:::