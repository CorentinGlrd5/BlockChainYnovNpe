class Transaction {
  constructor(num_page, contenu, titre, auteur) {
    this.num_page = num_page;
    this.contenu = contenu;
    this.titre = titre;
    this.auteur = auteur;
    this.timestamp = Date.now();
  }

  getDetails() {
    const { num_page, contenu, titre, auteur, timestamp } = this;
    return {
      num_page,
      contenu,
      titre,
      auteur,
      timestamp
    };
  }

  parseTransaction(transaction) {
    this.num_page = transaction.num_page;
    this.contenu = transaction.contenu;
    this.titre = transaction.titre;
    this.auteur = transaction.auteur;

    this.timestamp = transaction.timestamp;
  }
}

module.exports = Transaction;
