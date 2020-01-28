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

exports.generateNonce = generateNonce;
