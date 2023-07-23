# Block369


Block369 est le projet idéal pour gérer votre bail commercial ! Vous êtes propriétaire ? Créez une représentation de votre bail via notre formulaire et mintez le NFT correspondant ! Il ne vous reste plus qu'à le mettre en vente sur notre marketplace et attendre que les locataires viennent à vous !

Vous cherchez un local ? Parcourez les nombreuses offres de baux proposées sur notre marketplace ! Achetez le NFT qui vous convient et... félicitations ! Vous êtes maintenant locataire !

Ensuite, laissez-vous guider par notre plateforme qui rend votre contrat automatique : le loyer, les commandements de payer, la révision du loyer, l'indexation sur le référentiel de l'INSEE ? Tout cela est géré par votre plateforme ! Profitez d'une gestion simplifiée et efficace avec Block369.


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


## TheGraph


La Dapp utilise TheGraph pour trier les NFTs. A la maniere d'une API, une querie suivant le cas d'utilisation (Ex : récupérer les NFTs appartenant à une certaine adresse) récupère les données sous forme de JSON pour les envoyer au front en temps reel. 
    


## Vercel 


retrouvez la Dapp en live ici : https://block-369-0xmrik.vercel.app/ 



## Video de Présentation


Insérez ici le lien ou le code d'intégration de votre vidéo de présentation.
