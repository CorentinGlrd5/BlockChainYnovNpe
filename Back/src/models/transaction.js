class Transaction {
  constructor(pages) {
    this.pages = pages;
    this.timestamp = Date.now();
  }

  getDetails() {
    const { pages, timestamp } = this;
    return {
      pages,
      timestamp
    };
  }

  parseTransaction(transaction) {
    this.pages = transaction.pages;
    this.timestamp = transaction.timestamp;
  }
}

module.exports = Transaction;
