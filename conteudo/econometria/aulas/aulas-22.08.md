---
title: "Aulas até o dia 22.08"
---

# Aulas até o dia 22.08

Não anotei qual dia era qual, então tem uma mistura de várias aulas aqui...

----------

Dados em painel:

- modelo de efeitos fixos
- modelo de efeitos aleatórios
- _Pooled_ (MQO nos dados empilhados)

::: tip Pressuposto básico de painel:
- $_n$ indivíduos;
- $_t$ períodos de tempo;
- $_n$ > $_t$
  - Se t começa a crescer demais, mesmo com n grande, começo a ter que me preocupar com a estacionariedade do modelo
  - $y_{it} = \alpha_{0} + \beta_1x_{it} + \nu_{it}$
:::

**Série estacionária:** relativamente estável dentro de uma banda de tempo**

- Painéis balanceados
  - todos indivíduos aparecem em todos os períodos de tempo;
- Painéis desbalanceados
  - alguns indivíduos desaparecem;
    - esse desaparecimento pode ser aleatório ou não aleatório, sendo que o não aleatório é mais difícil.
  - isso tem implicações importantes, mas vamos lidar com balanceados no início do curso;

**Série estacionária** tem relativa estabilidade dentro de uma banda, enquanto a **não estacionária** tem a presença de raíz unitária. A Econometria sempre faz testes pressupondo que uma variável tende ao infinito, e se essa variável for $_n$, tá tudo de boa, mas com $_t$ pode-se incorrer em séries estacionárias. Eventualmente, o professor deu ideia que pode-se avaliar painéis co-integrados para mitigar esse problema.

::: danger Estudar
- Quais são as implicações práticas de uma série estacionária?
  - Sei que sua tendência é de estabilizar no longo prazo, mas e aí, eu não deveria poder usá-la para alguma coisa?
- O que é raíz unitária
- A base teórica e prática de MQO
- O que é homocedasticidade
:::

Exemplo do custo total de uma companhia aérea:

------

$$
CT_i = \beta_1 + \beta_2x_{it} + \beta_3PF_i + V_{it}
$$

Onde $x_{it}$ é a quantidade produzida (voos realizados) e $P$ é o preço do combustível

------

O problema dessa equação é que ela assume uma inclinação comum a todas as empresas. Se quisermos imaginar que elas têm estruturas de custo e administrativas diferentes - e que esse _modus operandi_ não varia no tempo ($\alpha$ independente de $_t$) - podemos pensar numa declividade comum com níveis diferentes entre as empresas (vide gráfico abaixo). Pra fazer isso, só com painéis e assumindo uma variável:

- não observável;
- fixa no tempo;
- podendo ou não estar relacionada com x.

-----

![gráfico de custos de diferentes companhias aéreas](/econometria/grafico-custo-cia-aerea.jpg)

<centered-italicized text="Ao invés de assumir uma reta única para todos os indivíduos (reta azul feiosa), criamos várias com a mesma inclinação mas níveis diferentes." />

-----

Pegamos essa parâmetro $a_i$ não observável e fixo no tempo (o que é **vital** para séries em painel) e estimamos ele ao longo do tempo.

$a_i$ pode, ou não, estar correlacionado com $x_{it}$:
- correlacionado (afeta ou é afetado por x): $\large{Plim\hat{\beta}^{OLS}_i = \beta + \frac{cov(x_{it}, \alpha_i)}{\sigma^2_x}}$
  - efeito fixo
- não correlacionado: $\large{Plim\hat{\beta}^{OLS}_i = \beta}$, mas $\hat{\beta}^{OLS}$ é ineficiente
  - efeito aleatório;
  - não relacionado com $x$ leva à auto-correlação dos resíduos, por isso a ineficiência de $\hat{\beta}$;
- (confesso que não faço ideia do que que essas equações querem dizer)

::: tip Parêntesis
Auto-correlações dos resíduos implica na perda da eficiência dos indicadores (variância, não $\beta$, que é o problema)
:::

- **Vamos usar um painel com modelo de efeito fixo ou aleatório dependendo da correlação entre $\alpha_i$ e $x_{it}$**.
  - Você até poderia usar um MQO basicão e terminar em minutos, mas vai levar a inferências ineficientes