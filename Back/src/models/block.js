const crypto = require("crypto");

const Transaction = require("./transaction");

class Block {
  constructor(num_block, previousBlockHash, pages, validatorId, hash, nonce) {
    this.num_block = num_block;
    this.hash = hash;
    this.nonce = nonce;
    this.previousBlockHash = previousBlockHash;
    this.pages = pages;
    this.validatorId = validatorId;
    this.timestamp = Date.now();
  }

  hashValue() {
    const { nonce, pages } = this;
    const blockString = `${nonce}-${JSON.stringify(pages)}`;
    const hashFunction = crypto.createHash("sha256");
    hashFunction.update(blockString);
    return hashFunction.digest("hex");
  }
  init() {
    this.hash = this.hashValue();
    this.mineBlock(3);
  }
  mineBlock(difficulty) {
    if (this.num_block === 0) {
      return;
    }
    console.log("Minage en cours....");
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.hashValue();
    }
    console.log("Miné: " + this.nonce);
  }

  setNonce(nonce) {
    this.nonce = nonce;
  }
  getHash() {
    return this.hash;
  }
  setValidator(id) {
    this.validatorId = id;
  }
  getTimestamp() {
    return this.timestamp;
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
      validatorId,
      hash,
      pages,
      timestamp
    } = this;
    return {
      num_block,
      nonce,
      timestamp,
      previousBlockHash,
      validatorId,
      hash,
      pages: pages.map(page => page.getDetails())
    };
  }

  parseBlock(block) {
    this.num_block = block.num_block;
    this.nonce = block.nonce;
    this.previousBlockHash = block.previousBlockHash;
    this.timestamp = block.timestamp;
    this.pages = block.pages.map(transaction => {
      const parsedTransaction = new Transaction();
      parsedTransaction.parseTransaction(transaction);
      return parsedTransaction;
    });
  }

  printpages() {
    this.pages.forEach(transaction => console.log(transaction));
  }
}

module.exports = Block;
