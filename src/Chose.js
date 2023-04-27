// définition d'un livre
export default class Chose {
  // Définition du livre
  constructor(id, titre, qtestock, prix) {
    this._titre = titre;
    this._prix = prix;
    this._id = id;
    this._qtestock = qtestock;
  }
  get titre() {
    return this._titre;
  }
  get prix() {
    return this._prix + "€";
  }
  get id() {
    return this._id;
  }
  get qtestock() {
    return this._qtestock;
  }
  // ajoute une unité au stock
  modifyStockadd() {
    this._qtestock = this._qtestock + 1;
  }
  // enleve une unité au stock
  modifyStockdelete() {
    this._qtestock = this._qtestock - 1;
  }
  // Permet l'affichage du livre
  pourAfficher() {
    return `${this._titre}`;
  }
}
