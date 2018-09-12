---
title: "Aula 31.08"
---

# Aulas de econometria II de 31.08

**Grupo de controle** (placebo) VS. **tratamento**

(falta transcrever coisa!)

Hipótese: tanto o grupo de controle quanto o de tratamento possuem tendência comum ($\gamma$)

Tabela de dados em painel para caçar tendências específicas:

| Indivíduo | $y$ | $x$ | $T$ | $t$ | $T * t$ | _trend 1_ | _trend 2_ |
|-----------|---|---|---|---|-------|---------|---------|
| 1 | $y_{11}$ | $x_{11}$ | 1 | 0 | 0 | 1 | 0 |
| 1 | $y_{12}$ | $x_{12}$ | 1 | 1 | 1 | 2 | 0 |
| 1 | $y_{13}$ | $x_{13}$ | 1 | 1 | 1 | 3 | 0 |
| 2 | $y_{21}$ | $x_{21}$ | 1 | 0 | 0 | 0 | 1 |
| 2 | $y_{22}$ | $x_{22}$ | 1 | 1 | 1 | 0 | 2 |
| 2 | $y_{23}$ | $x_{23}$ | 1 | 1 | 1 | 0 | 3 |
| 3 | $y_{31}$ | $x_{31}$ | 0 | 0 | 0 | 0 | 0 |
| 3 | $y_{32}$ | $x_{32}$ | 0 | 1 | 0 | 0 | 0 |
| 3 | $y_{33}$ | $x_{33}$ | 0 | 1 | 0 | 0 | 0 |
| 4 | $y_{41}$ | $x_{41}$ | 0 | 0 | 0 | 0 | 0 |
| 4 | $y_{42}$ | $x_{42}$ | 0 | 1 | 0 | 0 | 0 |
| 4 | $y_{43}$ | $x_{43}$ | 0 | 1 | 0 | 0 | 0 |

A saber:

- Programa começa em $t = 2$;
- Grupo de tratamento é composto por indivíduos 1 e 2, controle por 3 e 4;
- _trend 2_ é a tendência do indivíduo 2 -> ao adicionar a tendência, estamos ajudando a expurgar outras correlações o error (não sei se é exatamente isso, mas elas deixam o modelo + robusto)
- Não é preciso fazer painel, mas isso ajudaria na qualidade do estimador