# Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)

# Étape Docker

1. **Installer l'image MongoDB :**

   ```bash
   docker pull mongo
   ```
2. **Démarrer le conteneur MongoDB :**
   ```bash
   docker run -d -p 40001:27017 --name brewery-mongo mongo
   ```
3. **Accéder au shell MongoDB :**
   ```bash
   docker exec -it brewery-mongo mongo
   ```
4. **Accéder au shell MongoDB :**
   ```bash
   use brewery

   db.beers.insertMany([
   {
    "name": "IPA",
    "style": "India Pale Ale",
    "brewery": "Sample Brewery",
    "alcohol_content": 6.5,
    "description": "A hoppy and flavorful beer with a higher alcohol content."
   },
   {
    "name": "Stout",
    "style": "Dry Stout",
    "brewery": "Another Brewery",
    "alcohol_content": 5.0,
    "description": "A dark and rich beer with roasted malt flavors."
   },
   ])

   ```
# Étape Docker
1. **Installer les dépendances Node.js :**
   ```bash
   npm install
   ```
2. **Exécuter le serveur Node.js :**
   ```bash
   node ./index.js
   ```

Le serveur devrait maintenant être accessible à l'adresse http://localhost:3000.

Auteurs Barron Thomas AIDB
Date 07/01/2024
