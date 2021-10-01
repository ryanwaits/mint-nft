const { ethers } = require("ethers");

const ABI = require("./ABI.json");
const { privateKey } = require("./privateKey.json");

// change this to the contract you intend to call
const ADDRESS = "0xfcB1315C4273954F74Cb16D5b663DBF479EEC62e";
const GAS_LIMIT = 2000000;
const GAS_PRICE = ethers.utils.parseUnits("666", "gwei");
// make sure more than 1 can actually be minted by a single address
const MAX_AMOUNT = 5;
// change this to represent the minting price
const TOKEN_PRICE = ethers.utils.parseEther("0.08");
const INTERVAL = 500;

// use infura
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(ADDRESS, ABI, wallet);

async function main() {
  try {
    // make sure the .saleIsActive() function exists on the contract (or equivalent)
    const saleIsActive = await contract.saleIsActive();
    console.log(saleIsActive);
    if (saleIsActive) {
      clearInterval(timer);
      console.log("LFG");
      contract.mintCupCat(MAX_AMOUNT, {
        gasLimit: GAS_LIMIT,
        gasPrice: GAS_PRICE,
        nonce: startingNonce,
        value: TOKEN_PRICE.mul(MAX_AMOUNT),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

let startingNonce;
let timer;

(async () => {
  startingNonce = await provider.getTransactionCount(wallet.address);
  timer = setInterval(() => {
    main();
  }, INTERVAL);
})();