const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
      "Deploying contracts with the account:",
      deployer.address
  );

  console.log(
      "Account balance:",
      (await ethers.provider.getBalance(deployer.address)).toString()
  );

}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });