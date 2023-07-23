const { ethers } = require("hardhat")

async function main() {
    let owner, addr1, addr2

    [owner, addr1, addr2] = await ethers.getSigners()

    const myContract = await ethers.getContractAt("NFTMarket", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // Crée un NFT avec un URI donné
    let transaction = await myContract.connect(owner).createNFT("https://my-nft-uri")
    await transaction.wait()
    console.log("NFT created successfully")

    // Liste le NFT pour la vente avec un prix donné (en wei)
    transaction = await myContract.connect(owner).listNFT(1, ethers.utils.parseEther("1"))
    await transaction.wait()
    console.log("NFT listed successfully")

    // Achète le NFT listé
    transaction = await myContract.connect(addr1).buyNFT(1, { value: ethers.utils.parseEther("1") })
    await transaction.wait()
    console.log("NFT bought successfully")

    // Annule la liste d'un NFT
    transaction = await myContract.connect(addr1).cancelListing(1)
    await transaction.wait()
    console.log("Listing cancelled successfully")

    // Retire les fonds du contrat
    transaction = await myContract.connect(owner).withdrawFunds()
    await transaction.wait()
    console.log("Funds withdrawn successfully")

    console.log("All operations completed successfully.")
}

main()
    .then(() => process.exit(0)) 
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })