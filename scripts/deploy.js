const hre = require("hardhat");

async function main() {

  const Fitup = await hre.ethers.getContractFactory("Fitup");
  const fitup = await Fitup.deploy();

  await fitup.deployed();

  console.log("Fitup deployed to:", fitup.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
