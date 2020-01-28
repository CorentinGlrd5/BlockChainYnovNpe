const Block = require("./block");

const actions = require("../constants");

const { generateNonce, isNonceValid } = require("../utils/nonce");

class Blockchain {
  constructor(blocks, io) {
    this.blocks = blocks || [new Block(0, 1, [], "", 1, 0)];
    this.currentTransactions = [];
    this.nodes = [];
    this.io = io;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  mineBlock(block) {
    block.mineBlock(5);
    block.setValidator(global.id);
    this.blocks.push(block);
    console.log("Mined Successfully");
    //console.log(block)
    this.io.emit(actions.END_MINING, this.toArray());
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  async newTransaction(transaction) {
    this.currentTransactions.push(transaction);
    if (this.currentTransactions.length === 1) {
      console.info("Starting mining block...");
      const previousBlock = this.lastBlock();
      process.env.BREAK = false;
      const block = new Block(
        previousBlock.getNum_block() + 1,
        previousBlock.hashValue(),
        previousBlock.getNonce(),
        this.currentTransactions
      );
      this.currentTransactions = [];
      this.mineBlock(block);
    }
  }
  checkIfBlockExist(block) {
    this.blocks.forEach(b => {
      if (b.hashValue() === block.hashValue()) {
        return true;
      }
    });
    return false;
  }

  lastBlock() {
    return this.blocks[this.blocks.length - 1];
  }
  deleteLastBlock() {}

  getLength() {
    return this.blocks.length;
  }

  checkValidity(block) {
    console.log("1:" + block.getPreviousBlockHash());
    console.log("2:" + this.lastBlock().getHash());
    if (block.getPreviousBlockHash() != this.lastBlock().getHash()) {
      console.log("Error 1");
      return false;
    }
    if (this.checkIfBlockExist(block)) {
      if (
        block.getHash() === this.lastBlock().hashValue() &&
        block.getTimestamp() < this.lastBlock().getTimestamp()
      ) {
        this.blocks[this.blocks.length - 1].pop();
        return true;
      }
      console.log("Error 2");
      return false;
    }
    return true;
  }
  parseChain(blocks) {
    this.blocks = blocks.map(block => {
      const parsedBlock = new Block(0);
      parsedBlock.parseBlock(block);
      return parsedBlock;
    });
  }

  toArray() {
    return this.blocks.map(block => block);
  }
  printBlocks() {
    this.blocks.forEach(block => console.log(block));
  }
}

module.exports = Blockchain;
