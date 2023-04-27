<script setup>
// AFFICHER LA LISTE DES LIVRES ET RECHERCHER UN LIVRE
import { reactive, onMounted } from "vue";
// la classe Chose
import Chose from "../Chose";

// --> donnée réactive = l'affichage sera actualisée automatiquement à chque changement dans la liste
const listeC = reactive([]);

// la fonction qui récupère les livres et les affiche
function getListeLivre() {
  //url de l'api pour récupérer les livres
  const url =
    "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/31/livres";
  let fetchOptions = { method: "GET" }; // On utilise GET pour récupéré les infos ici le titre de chaque livre
  fetch(url, fetchOptions)
    .then((response) => {
      console.log("testget");
      // réponse au sens du protocole HTTP
      return response.json(); // extraire les données au format JSON
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.forEach((v) =>
        //on met dans la liste réactive l'id, le titre, la qte, le prix
        listeC.push(new Chose(v.id, v.titre, v.qtestock, v.prix))
      );
    })
    // gestion des erreurs
    .catch((error) => console.log(error));
}
// la fonction affiche les livres vérifiant le critère de recherche
// la fonction affiche les livres vérifiant le critère de recherche
function rechercherLivre(search) {
  console.log(search);
  const url =
    "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/31/livres?search=";
  const fetchOptions = { method: "GET" };
  fetch(url + search, fetchOptions)
    .then((response) => {
      console.log("test");
      return response.json();
    })
    .then((dataJSON) => {
      let livres = dataJSON;
      console.log(livres);
      let texteHTML = ""; // variable pour contenir le html généré
      for (let l of livres) {
        // boucle sur le tableau des livres
        texteHTML = texteHTML + "<li>" + l.titre + "</li>";
      }
      // insérer le HTML dans la liste <ul id="liste"></ul> du fichier index.html
      document.getElementById("liste2").innerHTML = texteHTML;
    })
    .catch((error) => console.log(error));
}
// permet d'actualiser la page en réafichant la liste
onMounted(() => {
  getListeLivre();
});
</script>

<template>
  <h3>Liste des livres</h3>
  <!-- Pour Afficher la liste sous forme de tableau -->

  <div>
    <table>
      <!-- Les intitulé des colonnes -->
      <tr id="titre" class="titre">
        <th>Titre</th>
        <th>Prix</th>
        <th>Quantité en stock</th>
      </tr>
      <!-- Si le tableau des catégories est vide -->
      <tr v-if="!listeC">
        <td colspan="4">Veuillez patienter, chargement des livres...</td>
      </tr>
      <!-- Si le tableau des catégories n'est pas vide -->
      <!-- On met les données dans les colonnes grâce a une boucle -->
      <tr v-for="chose of listeC" :key="chose.id">
        <td>{{ chose.titre }}</td>
        <td>{{ chose.prix }}</td>
        <td>{{ chose.qtestock }}</td>
      </tr>
    </table>
  </div>
  <!-- On met un input pour la recherche-->
  <div id="search" class="recherche">
    <input
      type="text"
      id="nom"
      v-model="recherche"
      placeholder="Nom du livre"
      class="inputsearch"
    />
    <!-- Lorsqu'on click sur le bouton on lance la fonction search avec l'element recupére dans le input-->
    <button @click="rechercherLivre(recherche)">Rechercher</button>

    <ul id="liste2"></ul>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.6em;
  color: rgb(255, 167, 211);
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
  margin-left: 35%;
  margin-right: 35%;
  background-color: white;
}

.recherche {
  margin-left: 32.7%;
}
.titre {
  text-transform: uppercase;
}

table {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-transform: capitalize;
  background-color: white;
}
ul {
  font-family: "Arial";
  font-size: 1em;
  text-align: left;
  margin-right: 48%;
  background-color: white;
}

td,
th {
  border: 1px solid rgb(0, 0, 0);
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(255, 167, 211);
  color: rgb(255, 255, 255);
}
</style>