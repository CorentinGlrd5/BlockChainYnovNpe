const crypto = require("crypto");

const generateNonce = previousNonce =>
  new Promise(resolve => {
    setImmediate(async () => {
      let nonce = Math.random() * 10000000001;
      const dontMine = process.env.BREAK;
      if (isNonceValid(previousNonce, nonce) || dontMine === "true") {
        resolve({ nonce, dontMine });
      } else {
        resolve(await generateNonce(previousNonce));
      }
    });
  });

const isNonceValid = (previousNonce, currentNonce) => {
  const difference = currentNonce - previousNonce;
  const nonceString = `difference-${difference}`;
  const hashFunction = crypto.createHash("sha256");
  hashFunction.update(nonceString);
  const hexString = hashFunction.digest("hex");
  if (hexString.includes("000000")) {
    return true;
  }
  return false;
};

exports.generateNonce = generateNonce;
exports.isNonceValid = isNonceValid;
