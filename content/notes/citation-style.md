---
title: "Gravity models and the zeroes problem"
date: 2025-11-10
categories: ["notes"]
tags: ["trade", "econometrics"]
summary: "Revisiting the Poisson pseudo-maximum likelihood estimator for trade flows with many zero observations — practical notes on Stata and R implementation."
math: true
---

Silva & Tenreyro (2006) showed that OLS on log-linearised gravity equations is inconsistent in the presence of heteroskedasticity. The PPML estimator provides consistency and handles zeros naturally.

## The Problem with Log-OLS

The standard log-linear gravity model is:

$$\ln X_{ij} = \alpha + \beta_1 \ln Y_i + \beta_2 \ln Y_j - \beta_3 \ln d_{ij} + \varepsilon_{ij}$$

This requires $X_{ij} > 0$, dropping all zero-trade pairs and introducing selection bias.

## PPML Solution

PPML estimates the levels model:

$$X_{ij} = \exp\!\left[\alpha + \beta_1 \ln Y_i + \beta_2 \ln Y_j - \beta_3 \ln d_{ij}\right] \cdot \eta_{ij}$$

with the moment condition $\mathbb{E}[\eta_{ij} \mid \mathbf{x}_{ij}] = 1$.

## Stata Implementation

```stata
ppmlhdfe trade lngdp_i lngdp_j lndist contiguous comlang_off, ///
  absorb(importer_year exporter_year pair) vce(cluster pair)
```

## R Implementation

```r
library(fixest)
m <- fepois(trade ~ log(gdp_i) + log(gdp_j) + log(dist) |
              importer^year + exporter^year + pair,
            data = gravity, cluster = ~pair)
```
