const crypto = require("crypto");

const Transaction = require("./transaction");

class Block {
  constructor(num_block, previousBlockHash, nonce, transactions) {
    this.num_block = num_block;
    this.nonce = nonce;
    this.previousBlockHash = previousBlockHash;
    this.transactions = transactions;
    this.timestamp = Date.now();
  }

  hashValue() {
    const { num_block, nonce, transactions, timestamp } = this;
    const blockString = `${num_block}-${nonce}-${JSON.stringify(
      transactions
    )}-${timestamp}`;
    const hashFunction = crypto.createHash("sha256");
    hashFunction.update(blockString);
    return hashFunction.digest("hex");
  }

  setNonce(nonce) {
    this.nonce = nonce;
  }

  getNonce() {
    return this.nonce;
  }

  getNum_block() {
    return this.num_block;
  }

  getPreviousBlockHash() {
    return this.previousBlockHash;
  }

  getDetails() {
    const {
      num_block,
      nonce,
      previousBlockHash,
      transactions,
      timestamp
    } = this;
    return {
      num_block,
      nonce,
      timestamp,
      previousBlockHash,
      transactions: transactions.map(transaction => transaction.getDetails())
    };
  }

  parseBlock(block) {
    this.num_block = block.num_block;
    this.nonce = block.nonce;
    this.previousBlockHash = block.previousBlockHash;
    this.timestamp = block.timestamp;
    this.transactions = block.transactions.map(transaction => {
      const parsedTransaction = new Transaction();
      parsedTransaction.parseTransaction(transaction);
      return parsedTransaction;
    });
  }

  printTransactions() {
    this.transactions.forEach(transaction => console.log(transaction));
  }
}

module.exports = Block;
