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

  // Remplacer 'YourContract' par le nom de votre contrat
  const ContractFactory = await ethers.getContractFactory('NFTMarketplace');
  const contract = await ContractFactory.deploy(/* Les arguments du constructeur du contrat s'il y en a */);

  // Attente de la réception du contrat
  await contract.deployed();

  // Console.log l'adresse du contrat déployé
  console.log('YourContract deployed at:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });