# Marketplace NFT

Bienvenue sur mon projet de Marketplace NFT, un jalon clé dans mon parcours de certification auprès de l'école Alyra. Ce projet se distingue par son accent sur les fonctionnalités robustes et fiables, bien que l'interface utilisateur reste simple. L'objectif était de créer une application décentralisée (dApp) fonctionnelle permettant aux utilisateurs de créer (« mint ») et de commercialiser leurs NFTs

## Stack

pour ce projet, j'ai utilisé : 

- React : Utilisé pour construire l'interface utilisateur de la dApp, offrant une expérience utilisateur intuitive et réactive.
- Wagmi : Une bibliothèque de hooks React conçue pour intégrer efficacement le smart contract avec le front-end de l'application.
- Solidity : Le langage de programmation choisi pour le développement de smart contracts sur la blockchain Ethereum, assurant sécurité et fiabilité.
- The Graph : Employé pour indexer les données transitant sur la blockchain, facilitant ainsi la création d'une API robuste et la récupération efficace des données.
- NFTStorage : Utilisé pour lier les métadonnées (y compris les images) téléchargées par les utilisateurs à leurs NFTs mintés, garantissant une gestion sûre et persistante des données.

## Installer le projet 


rendez-vous dans le dossier 'frontend' : 

```unix
cd frontend
```

puis installez les dépendences : 

```unix
npm install
```

et enfin lancez Next en mode dev : 

```unix
npm run dev
``` 



## Backend


Le backend de ce projet est construit avec Hardhat.

Pour essayer, vous pouvez exécuter certaines des tâches suivantes :

> *deployer un contrat sur le reseau sepolia :*
> ```unix
> npm run deploy
> ```


> *tester le smart-contract 'NFTMarketplace.sol' via le backend :* 
> ```unix
> npm run test
> ```

> *tester le coverage du contrat :*
> ```unix
> npx hardhat coverage
> ```



## Vercel 


retrouvez la Dapp en live ici : https://block-369-0xmrik.vercel.app/ 



## Video de Présentation


https://drive.google.com/file/d/1u8bXf9M0Qllrf_C6tOvaQIGCacuQmDnY/view?usp=drive_link
