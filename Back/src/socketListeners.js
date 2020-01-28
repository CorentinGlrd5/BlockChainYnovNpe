const SocketActions = require("./constants");
const Block = require("./models/block");

const Transaction = require("./models/transaction");
const Blockchain = require("./models/chain");

const socketListeners = (socket, chain) => {
  socket.on(SocketActions.ADD_TRANSACTION, pages => {
    const transaction = new Transaction(pages);
    chain.newTransaction(transaction);
    console.info(
      `Added transaction: ${JSON.stringify(
        transaction.getDetails(),
        null,
        "\t"
      )}`
    );
  });
  socket.on(SocketActions.ADD_BLOCK, blockToCheck => {
    const block = new Block(
      blockToCheck.num_block,
      blockToCheck.previousBlockHash,
      blockToCheck.pages,
      blockToCheck.validatorId,
      blockToCheck.hash,
      blockToCheck.nonce
    );
    if (chain.checkValidity(block)) {
      chain.addBlock(block);
    } else {
      console.log("Block en erreur");
    }
    //console.info(`Added block: ${JSON.stringify(block, null, "\t")}`);
    chain.printBlocks();
  });

  socket.on(SocketActions.END_MINING, newChain => {
    console.log("End Mining encountered");
    process.env.BREAK = true;
    const blockChain = new Blockchain();
    blockChain.parseChain(newChain);
    if (
      blockChain.checkValidity() &&
      blockChain.getLength() >= chain.getLength()
    ) {
      chain.blocks = blockChain.blocks;
    }
  });

  return socket;
};

module.exports = socketListeners;
