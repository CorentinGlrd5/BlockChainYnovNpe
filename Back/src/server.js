const app = require("express")();
const bodyParser = require("body-parser");
const httpServer = require("http").Server(app);
const axios = require("axios");
const io = require("socket.io")(httpServer);
const client = require("socket.io-client");
const cors = require("cors");

const BlockChain = require("./models/chain");
const Block = require("./models/block");

const SocketActions = require("./constants");

const socketListeners = require("./socketListeners");

const { PORT } = process.env;

const blockChain = new BlockChain(null, io);

global.port = process.env;
global.id = generateId();
console.log("Bonjour, je suis " + global.id);
app.use(bodyParser.json());
app.use(cors());

app.post("/nodes", (req, res) => {
  const { host, port } = req.body;
  const { callback } = req.query;
  const node = `http://${host}:${port}`;
  const socketNode = socketListeners(client(node), blockChain);
  blockChain.addNode(socketNode, blockChain);
  if (callback === "true") {
    console.info(`Added node ${node} back`);
    res.json({ status: "Added node Back" }).end();
  } else {
    axios.post(`${node}/nodes?callback=true`, {
      host: req.hostname,
      port: PORT
    });
    console.info(`Added node ${node}`);
    res.json({ status: "Added node" }).end();
  }
});

app.post("/transaction", (req, res) => {
  const { pages } = req.body;
  var newBlock = new Block(
    blockChain.lastBlock().getNum_block() + 1,
    blockChain.lastBlock().getHash(),
    pages,
    null,
    null,
    null
  );
  newBlock.init();
  io.emit(SocketActions.ADD_BLOCK, newBlock);
  res.json({ message: "transaction success" }).end();
});

app.get("/chain", (req, res) => {
  res.json(blockChain.toArray()).end();
});

io.on("connection", socket => {
  console.info(`Socket connected, ID: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Socket disconnected, ID: ${socket.id}`);
  });
});
function generateId() {
  ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  ID_LENGTH = 10;

  rtn = "";
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}
blockChain.addNode(
  socketListeners(client(`http://localhost:${PORT}`), blockChain, io)
);

httpServer.listen(PORT, () =>
  console.info(`Express server running on ${PORT}...`)
);
