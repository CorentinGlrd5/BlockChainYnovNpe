const SocketActions = require("./constants");
const Block = require("./models/block");

const socketListeners = (socket, chain, io) => {
  socket.on(SocketActions.SEND_BLOCK, b => {
    console.log("send block from " + global.port);
    const block = new Block(
      b.num_block,
      b.previousBlockHash,
      b.pages,
      b.validatorId,
      b.hash,
      b.nonce
    );
    console.log("emit on " + global.port);
    io.emit(SocketActions.ADD_BLOCK, block);
  });
  socket.on(SocketActions.ADD_BLOCK, blockToCheck => {
    console.log("ajout d'un block on :" + global.port);
    const block = new Block(
      blockToCheck.num_block,
      blockToCheck.previousBlockHash,
      blockToCheck.pages,
      blockToCheck.validatorId,
      blockToCheck.hash,
      blockToCheck.nonce
    );
    if (chain.checkValidity(block)) {
      block.validatorId = global.id;
      chain.addBlock(block);
    } else {
      console.log("Block en erreur");
    }
  });
  return socket;
};

module.exports = socketListeners;
