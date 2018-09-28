---
title: Modelo Diff 'n Diff
---

# Modelo Diff 'n Diff

A diff 'n diff acontece quando você tem um painel que, no meio dele, sofreu com um choque exógeno / externo que diferencia dois grupos, e você quer medir o efeito desse choque. Esse é o caso, por exemplo, de uma política pública que pretende aumentar o rendimento de escolas e escolhe algumas para fazer parte do programa (**grupo de tratamento**) e deixa outras como estavam pra servirem de parâmetro para comparação (**grupo de controle**).

A discussão ao redor da diff 'n diff parte do **viés de seleção** dos indivíduos, em que muito provavelmente existe alguma característica intrínseca a esses agentes que os levaram a serem selecionados para o tratamento e, por isso, devemos isolar essa característica para não viesar o efeito do tratamento.

Num cenário ideal, copiaríamos cada agente e compararíamos através de médias simples e desvio padrão como cada versão (uma de controle e outra de tratamento) se comportou, e a partir daí teríamos o resultado que gostaríamos. Isso só é praticável no mundo da ciência da computação, e até aí não é tão trivial... então o que muitas ciências fazem é rodar um _randomized trial_, em que a escolha dos agentes é totalmente aleatória e controlamos por diversos fatores, não havendo viés de seleção.

No entanto, por fatores políticos e sociais, a economia não é tão simples assim e não conseguimos fazer o mesmo com ela, precisamos, então, _incorporar o fato de que vai haver viés de seleção no modelo_!

Entendendo isso, precisamos assumir também que ambos os grupos da amostra estavam diante de uma tendência prévia que precisa ser excluída do modelo pra não viesar os estimadores: se, num geral, o Brasil já vinha melhorando seu desempenho escolar, por exemplo, não podemos afirmar que um aumento de x% do rendimento no período analisado se deve totalmente ao programa implementado, precisamos retirar essa tendência histórica.

----

$Y_i = \alpha + \beta T_i + \gamma t_i + \delta(T_i * t_i) + \varepsilon_i$, onde:

- $\alpha$: constante de nível comum a todos os indivíduos
- $\beta$: efeito específico do grupo de tratamento (efeitos médios, no caso) - representa o **fator de viés de seleção**: no exemplo das escolas, é o quanto um diretor engajado modifica o nível de desempenho de uma escola, de maneira fixa ao longo do tempo.
- $T_i$: dummy que identifica grupo de controle
- $t_i$: dummy de tempo que indica se houve aplicação do tratamento ou não (se tratamento foi em $t = 1$, ela seria 0 em $t_0$ e 1 em $t_1$, por exemplo)
- $\gamma$ - efeito comum tanto ao grupo de tratamento como controle - é a **tendência**
- $\delta_i$ - o **verdadeiro efeito** do choque, que é o que queremos estimar!

----

Representando graficamente, temos o seguinte:

![](/econometria/grafico-controle-tratamento.JPG)

A reta azul representa o momento do choque. Ah, e não coloquei no gráfico, mas a distância da curva de controle (verde) pro eixo x é a constante de nível $\alpha$!

::: warning Atenção
Claro que o viés de seleção pode se comportar de maneira menos óbvia e com maior variabilidade, com cada indivíduo do grupo de tratamento tendo seu próprio $\beta$, assim como esse _common trend_ do $\gamma$ pode ser único pra cada um e não presente da mesma forma pra T e C... Mas pra econometria II estamos lidando com a hipótese de que tudo isso é constante :wink:

Ah, e vale lembrar também que tem outros testes e ferramentas para além da Diff 'n Diff que lidam com esse cenário, só não vamos lidar com eles por hora.
:::

## Como fazer a Diff 'n Diff

FALTOU TEMPO PRA COMPLETAR ESSE GUIA!