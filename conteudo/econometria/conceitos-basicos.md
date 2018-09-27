---
title: Conceitos básicos de econometria
---

# Conceitos básicos de econometria

[[toc]]

## Basicões

### Matemática / estatística

- **Esperança**: a esperança de uma variável é seu valor esperado caso ela se repita várias vezes.
  - _Isso não quer dizer que a esperança é concretizada_! A realização de uma variável quase sempre vai ser diferente de sua esperança, mas esta ainda tem valor estatístico por ser o resultado das probabilidades de retorno desta variável.
  - Um bom exemplo disso é o ruído branco: sua esperança é 0, mas como o gráfico abaixo mostra, sua realização quase nunca é 0.
- **Variância**: indica qual é a distância de uma variável observada de seu valor esperado.
  - Ela parte do conceito de esperança, sendo definida por $E((X - \mu)^2)$ -> é a média do quadrado da distância de cada observação até a média.
  - Representada pelo $\sigma^2$ ou por $V(x)$
- **Co-variância**: Mede o grau de interdependência entre duas variáveis
  - Se variáveis forem independentes, seu valor é 0
  - Se as variáveis são aleatórias, sua co-variância é igual a $cov(X,Y) = E[(X - \mu_X)(Y - \mu_Y)]$
  - Você também pode representar se existe co-variância ou não entre a e b com $E(a \; b)$ (vi isso na [parte de efeito fixo de dados em painel](/econometria/dados-painel.html#estimador-de-efeitos-fixos-within-mas-tambem-pode-ser-via-dummy))
- **Desvio padrão**: quadrado da variância, ele mede a distância média da média
- **Matrizes, LaGrange e vetores** não são fáceis de explicar resumidamente e muito menos de entender a fundo, mas só são fundamentais pra compreender os mecanismos dos modelos econométricos. Pra esse curso, a não ser que você queira trabalhar na área, tá de boa entender só a ideia central de cada uma dessas coisas.
- **Distribuição qui-quadrado**: um tipo de distribuição que depende dos graus de liberdade e intervalo de confiança de uma série

### Econometria

- **Endogenia**: conceito básico de "fazer parte de". Na econometria, se uma variável é endógena é porque ela ajuda a explicar / estimar uma variável resposta.
- **Resíduo e erro**: O que sobra do modelo e não é explicado pelos parâmetros
  - Pode ser um erro composto, com resíduos distintos para cada efeito
- **Eficiência**: basicamente quão perto está um estimador da realidade
  - Ele parte da variância: quanto menor a variabilidade, maior a chance de o resultado cair no valor certo.
  - Um estimador, na média, vai ser mais eficiente se construído a partir de um _n_ maior. Logo, quanto maior o grau de liberdade de um modelo, maior sua eficiência. Guarda isso porque isso é importante pra discussão da primeira diferença
- **Consistência do estimador**: propriedade de grandes amostras
  - Um estimador pode ser consistente, porém viciado (e você ainda pode utilizá-lo);
  - Pelo que entendi, se um estimador é inconsistente é porque seu processo gerador de dados tá fadado à inutilidade pra econometria porque sempre vai viesar ou prejudicar o resultado de alguma forma.
  - O Igor falou bastante de consistência, é um debate central na econometria
- **Vício**: propriedade de pequenas amostras que tendem a certas estimações dos indicadores.
  - É menos relevante que a consistência: você pode utilizar um estimador viciado, com ressalvas, mas não pode usar um inconsistente.
- **dummy**: variável binária que a gente incorpora em modelos estatísticos pra isolar o efeito da ocorrência de um fenômeno ou não. Exemplos:
  - dummy pra caso seja um ano específico ou não.
  - faz parte do grupo de tratamento ou não
- **Autocorrelação**: Correlação entre o fenômeno que tô estudando e ele mesmo, só que em tempos passados ($k$ passos atrás).
  - Isso invalida um modelo de dados em painéis mas pode ser utilizado em séries temporais.
  - Resíduos auto-correlacionados implicam na perda de eficiência dos indicadores
  - Autocorrelação não implica em inconsistência
- **Modelo MQO** (mínimos quadrados ordinários): busca chegar a estimadores que produzem o menor valor possível da soma dos quadrados dos erros (minimizar $\sum(\varepsilon^2$))
  - A econometria 1 trata bastante disso e minha pretensão não é tentar lembrar (na real, aprender) como se faz um MQO, só dar uma pincelada no assunto. Pra isso, tem um [videozinho curto bem massa](https://www.youtube.com/watch?v=NH7P81EoXDI) que cê pode fragar a base matemática disso.
  - Você precisa fazer uma série de ajustes à sua base pra conseguir rodar um MQO consistente, porque minimizar o erro por si só não é suficiente.
  - Por exemplo, se existe endogeneidade no modelo, seus estimadores vão ser totalmente inconsistentes!
- **_Pooled_** (_cross-section_): formato de uma base de dados com múltiplas observações no tempo, em que aplicamos um MQO que desconsidera diferenças entre os indivíduos da amostra
  - Amostras são _independentes_
- **Dados em painel**: ao contrário da _cross-section_, uma série com dados em painel acompanha um dado grupo fixo de indivíduos ao longo do tempo. Leia mais sobre [dados em painel aqui](/econometria/dados-painel.html)
  - Amostras são _dependentes_ e, por isso, precisamos de uma série de ferramentas pra lidar com as complexidades que isso traz.
  - Esse trampo vale a pena, no entanto, porque essa informação individual é mais rica pra análise e estimações.
  - Nota: pode ser que seu painel não vai ser contínuo e alguns indivíduos vão sumir da amostra ao longo do tempo. Nesse caso, ao invés de desistir da estimação, você usa umas técnicas pra substituir esse indivíduo por outro parecido. O professor tocou nisso bem de leve e não vai investigar essa questão a fundo.

### Pendentes

- **Raíz unitária**: Por enquanto só sei que uma série não estacionária tem raíz unitária
- **Homcedasticidade**: (pendente)

## Ruído branco

Um ruído branco é, de maneira bem simples, um erro aleatório cuja esperança converge a 0 (seus valores podem subir e cair, mas tendem à média 0). Ele é formado por um processo muito puro, com nenhuma influência do passado.

**Ele faz parte de todos os processos estocásticos:** não tem uma única série que seja "lisinha", sempre respeitando perfeitamente uma equação estimada. Ela sempre vai ter pequenas variações aleatórias representadas pelo ruído branco, é isso que dá a característica de vários picos e vales pequenos em um gráfico. Esse efeito de variação, nas palavras do Igor, sempre vai ser um ruído brancou OU função de um ruído branco (**processo iid**: independente, invariável e discreto).

![Gráfico de um ruído branco](/econometria/ruido-branco.JPG)

$\varepsilon_t$ é um ruído branco se $E(\varepsilon_t) = 0$, $V(\varepsilon_t) = \sigma^2$ e $\gamma_k = 0 \; \forall \; k \ne 0$ (se sua esperança for 0, e não frago o resto kkkk)

Você também pode tentar observar se é ruído branco a partir da análise gráfica. O exemplo acima é claramente um ruído branco: por mais que uma ou outra observação fuja muito da interseção com eixo X, na média elas convergem a 0.

## Exogeneidade

O conceito de _exogeneidade_ parte da relação entre a variável resposta no tempo _t_ e o erro no tempo _t - k_... Ela pode ser _estrita_ ou _contemporânea_, sendo a primeira necessária pra dados em painel.

**exogeneidade estrita:** $cov(y_t,\varepsilon_{t-k}) = 0 \; \forall \; k$ - para toda comparação de tempo (qualquer _t_ e _k_), temos que o erro de um período não influencia em outro. Basicamente, uma nova observação em uma série é independente do valor da passada. Claramente isso é algo virtualmente impossível na economia, com os exemplos mais básicos sendo uma série de ruído branco

**exogeneidade contemporânea:** (tenho que lembrar porque perdi a anotação)

## Séries estacionárias vs. não estacionárias

- A **série estacionária é aquela estável ao redor de uma média** e com uma tendência de se manter constante. Isso traz alguns problemas pras séries temporais, como explicado abaixo, e, infelizmente, é algo recorrente nos dados econômicos. Isso é bem claro no caso da inflação, como o gráfico abaixo ilustra bem.

![Gráfico do IPCA](/econometria/grafico-ipca.png)

- O conceito de _estacionariedade_ faz sentido no domínio das séries temporais, onde $t \rightarrow \infty$. Dados em painéis, por mais que tenham uma dimensão temporal, têm um $t$ curto demais pra isso trazer implicações pro modelo.
- Isso parte do ponto de que suas observações podem seguir uma trajetória, que estabelece uma relação de dependência entre as observações no tempo, em que um tempo passado afeta o tempo presente. Se uma série se comporta assim, ela viola, por definição, a _exogeneidade estrita_, havendo, potencialmente, uma _exogeneidade contemporânea_.
- Dados em painel exigem exogeneidade estrita, então nesse caso de correlação ao longo da trajetória tem de ser tratado com instrumentos. (Não entendi, só decorei)
- Séries, por outro lado, são quase _desejáveis_ de conterem exogeneidade contemporânea, já que você quer, de fato, ver o efeito de um fator ao longo do tempo na trajetória de uma variável resposta.
- No entanto, essas séries **não podem ser estacionárias**, porque se forem você estará criando um modelo sem validade. Para entender essa questão, devemos verificar as condições para uma série ter _estacionariedade fraca_:

### Condições para estacionariedade fraca

::: warning Nota
Não sei o que seria uma estacionariedade "forte", mas o Igor não pegou nesse ponto :)

"Quem usa a estacionariedade forte são outros campos da ciência que não o nosso." Em economia, quase todas as séries não são estacionárias e, por isso, devemos tentar erradicá-la.
:::

- $E(Y_t) = \mu < \infty$ - a esperança da variável resposta é uma constante (lembrando que ela gira em torno de uma média) que não tende ao $\infty$
- $V(Y_t) = \gamma_0 < \infty$ -  a variância da variável resposta é constante (note o _0_ nesse gama) e não tende ao infinito
- $cov(Y_t \, , \, Y_{t-k}) = E[(Y_t - \mu) \; (Y_{t-k} - \mu)] = \gamma_k$
  - em que $\gamma_k < \infty$, e $\gamma_k \rightarrow 0$ se $k \rightarrow \infty$
  - $\gamma_k$ só depende da distância entre as observações e não do ponto do tempo em si.
  - O impacto de uma observação passada só depende da distância em relação ao tempo presente. Analisar ago/17 e set/17 é a mesma coisa que ago/18 e set/18 para os efeitos de $\gamma_k$ (_autocovariância_).

**O que isso significa:**
  - para existir _estacionariedade fraca_, a esperança de uma série deve ser constante (e igual à média), sua volatilidade (variância) deve ser constante (tendência a retornar / convergir para a média, justamente porque ela é estacionária).
  - com a 3° condição, queremos dizer que quanto maior o $k$, menos relevante é a covariância entre $Y_t$ e $Y_k$ (menor o impacto do tempo $k$ sobre o resultado do tempo $t$), com o ápice disso sendo cov = 0 com $k \rightarrow \infty$. Basicamente tamo assumindo que pode até ter _exogeneidade contemporânea_, mas ela não pode se estender indefinidamente

Vale lembrar que **mudanças no processo gerador de dados podem mudar a natureza da série**