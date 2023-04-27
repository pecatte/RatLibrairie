<script setup>
import { reactive, onMounted } from "vue";
// -- la classe Chose
import Chose from "../Chose";

// --> donnée réactive = l'affichage sera actualisée automatiquement à chque cght dans la liste
const listeC = reactive([]);
//url de l'api pour récupérer les livres
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/31/livres";

// La fonction qui récupère les livres et les affiche
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

// Sipprimer un livre
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

// permet d'actualiser la page en réafichant la liste
onMounted(() => {
  getListeLivre();
});
</script>

<template>
  <h3>Supprimer un livre</h3>
  <!-- Pour Afficher le tableau -->
  <div>
    <table>
      <tr id="titre" class="titre">
        <th>Titre</th>
        <th>Prix</th>
        <th>Quantité en stock</th>
        <th>Supprimer</th>
      </tr>
      <!-- Si le tableau des catégories est vide -->
      <tr v-if="!listeC">
        <td colspan="4">Veuillez patienter, chargement des livres...</td>
      </tr>
      <!-- Si le tableau des catégories n'est pas vide -->
      <tr v-for="chose of listeC" :key="chose.id">
        <td>{{ chose.titre }}</td>
        <td>{{ chose.prix }}</td>
        <td>{{ chose.qtestock }}</td>
        <td>
          <button @click="handlerDelete(chose.id)">Supprimer</button>
        </td>
      </tr>
    </table>
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