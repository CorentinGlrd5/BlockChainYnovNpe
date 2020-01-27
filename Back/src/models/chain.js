const Block = require("./block");

const actions = require("../constants");

const { generateNonce, isNonceValid } = require("../utils/nonce");

class Blockchain {
  constructor(blocks, io) {
    this.blocks = blocks || [new Block(0, 1, 0, [])];
    this.currentTransactions = [];
    this.nodes = [];
    this.io = io;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  mineBlock(block) {
    this.blocks.push(block);
    console.log("Mined Successfully");
    this.io.emit(actions.END_MINING, this.toArray());
  }

  async newTransaction(transaction) {
    this.currentTransactions.push(transaction);
    if (this.currentTransactions.length === 5) {
      console.info("Starting mining block...");
      const previousBlock = this.lastBlock();
      process.env.BREAK = false;
      const block = new Block(
        previousBlock.getNum_block() + 1,
        previousBlock.hashValue(),
        previousBlock.getNonce(),
        this.currentTransactions
      );
      const { nonce, dontMine } = await generateNonce(previousBlock.getNonce());
      block.setNonce(nonce);
      this.currentTransactions = [];
      if (dontMine !== "true") {
        this.mineBlock(block);
      }
    }
  }

  lastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  getLength() {
    return this.blocks.length;
  }

  checkValidity() {
    const { blocks } = this;
    let previousBlock = blocks[0];
    for (let index = 1; index < blocks.length; index++) {
      const currentBlock = blocks[index];
      if (currentBlock.getPreviousBlockHash() !== previousBlock.hashValue()) {
        return false;
      }
      if (!isNonceValid(previousBlock.getNonce(), currentBlock.getNonce())) {
        return false;
      }
      previousBlock = currentBlock;
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
    return this.blocks.map(block => block.getDetails());
  }
  printBlocks() {
    this.blocks.forEach(block => console.log(block));
  }
}

module.exports = Blockchain;
