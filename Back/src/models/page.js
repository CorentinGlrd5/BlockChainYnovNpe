class Page {
  constructor(num_page, contenu, titre, auteur) {
    this.num_page = num_page;
    this.contenu = contenu;
    this.titre = titre;
    this.auteur = auteur;
    this.timestamp = Date.now();
  }
  getPage() {
    return this;
  }
}
