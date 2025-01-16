# Simulation-de-Croquet-en-3D

## Description

Simulation d'un lancer de balle en 3D d'un jeu de croquet à l'aide de la bibliothèque Three.js. Le jeu comprend un parcours composé de trois arceaux et se termine par un demi-cône, dans lequel une balle doit rentrer pour gagner la partie. 

Un marteau lance tout d'abord la balle qui va suivre une trajectoire définie à partir de courbes de Bézier et qui a plus ou moins de chance de passer par les trois arceaux en fonction du mode de difficulté. Les caractéristiques des arceaux et certains paramètres du jeu sont modifiables grâce à un menu dat.GUI. Il est également possible de choisir une position des arceaux aléatoires ce qui implique des trajectoires peu réalistes en raison de l'utilisation de courbes de Bézier, ou alors une position déjà fixée qui affiche une trajectoire légèrement plus réaliste.

## Lancer la simulation

Cloner le projet et lancer [Main.html](/code/html/Main.html).

Projet réalisé dans le cadre du cours d'INFO3Ba en L2 Sciences et Techniques à  l'[Université de Bourgogne](https://www.ube.fr/).