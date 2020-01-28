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
    this.io.emit(actions.SEND_BLOCK, block);
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
  blockExist(block) {
    for (let j = 0; j < this.blocks.length; j++) {
      const element = this.blocks[j];
      if (element.getHash() === block.getHash()) {
        console.log("block exist");
        return true;
      }
    }
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
    if (block.getPreviousBlockHash() != this.lastBlock().getHash()) {
      return false;
    }
    if (this.blockExist(block)) {
      console.log("LE BLOC EXISTE");
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
