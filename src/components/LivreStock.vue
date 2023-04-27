<script setup>
import { reactive, onMounted } from "vue";

// -- la classe Chose
import Chose from "../Chose";

// -- la liste des choses --> dans le state
// --> donnée réactive = l'affichage sera actualisée
//      automatiquement à chque cght dans la liste
const listeC = reactive([]);
//url de l'api pour récupérer les livres
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/31/livres";

// Afficher le contenu de la librairie
// ======> la fonction qui récupère les livres et les affiche
function getListeLivre() {
  let fetchOptions = { method: "GET" }; // On utilise GET pour récupéré les infos ici le titre de chaque livre

  fetch(url, fetchOptions)
    .then((response) => {
      console.log("testget");
      // -- réponse au sens du protocole HTTP
      return response.json(); // -- extraire les données au format JSON
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.forEach((v) =>
        listeC.push(new Chose(v.id, v.titre, v.qtestock, v.prix))
      );
    })
    // gestion des erreurs
    .catch((error) => console.log(error));
}

// SUpprimer un livre
function handlerDelete(id) {
  console.log(id);
  // On utilise la méthode delete
  const fetchOptions = {
    method: "DELETE",
  };
  // On rajoute a l'url l'id de l'objet qu'on veut supprimer
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getListeLivre();
    })
    .catch((error) => console.log(error));
}

// ajouter 1 au stok d'un livre
// -- handler pour ajouter un livre au stock à partir de la liste de livres
function handlerAddStock(chose) {
  // -- ajouter un au stock
  chose.modifyStockadd();
  // -- entête http pour la req
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: chose._id,
      titre: chose._titre,
      prix: chose._prix,
      qtestock: chose._qtestock,
    }),
  };
  // -- la req AJAX
  console.log("livre", chose);
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // actualiser la liste des livres
      getListeLivre();
    })
    .catch((error) => console.log(error));
}

// ajouter 1 au stok d'un livre
function handlerDeleteStock(chose) {
  // -- supprimer un au stock
  chose.modifyStockdelete();

  // -- entête http pour la req
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: chose._id,
      titre: chose._titre,
      prix: chose._prix,
      qtestock: chose._qtestock,
    }),
  };
  // -- la req AJAX
  console.log("livre", chose);
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      if (chose._qtestock <= 0) {
        handlerDelete(chose._id);
      }
      // actualiser la liste des livres
      getListeLivre();
    })
    .catch((error) => console.log(error));
}

// permet d'actualiser la page en réafichant la liste
onMounted(() => {
  getListeLivre();
});
</script>

<template>
  <h3>Gérer son stock</h3>
  <!-- Pour Afficher la liste -->

  <div>
    <table>
      <tr id="titre" class="titre">
        <th>Titre</th>
        <th>Quantité en stock</th>
        <th>+</th>
        <th>-</th>
      </tr>
      <!-- Si le tableau des catégories est vide -->
      <tr v-if="!listeC">
        <td colspan="4">Veuillez patienter, chargement des livres...</td>
      </tr>
      <!-- Si le tableau des catégories n'est pas vide -->
      <tr v-for="chose of listeC" :key="chose.id">
        <td>{{ chose.titre }}</td>
        <td>{{ chose.qtestock }}</td>
        <td>
          <button @click="handlerAddStock(chose)">+</button>
        </td>
        <td>
          <button @click="handlerDeleteStock(chose)">-</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style>
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