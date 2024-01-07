const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; // Utilisez un port différent de celui de MongoDB pour éviter les conflits
const mongoUrl = 'mongodb://localhost:40001'; // Assurez-vous de spécifier le bon port

app.get('/', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const database = client.db('brewery');
    const beers = database.collection('beers');

    const pipelineAgregation = [
      {
        $group: {
          _id: '$brewery',
          beers: { $push: '$$ROOT' } 
        }
      }
    ];

    const beerList = await beers.aggregate(pipelineAgregation).toArray();

    res.send(beerList.map(group => `<div>
      <h2>${group._id}</h2>
      <p><strong>Teneur moyenne en alcool :</strong></p>
      <ul>
        ${group.beers.map(beer => `<li>
          <h3>${beer.name}</h3>
          <p><strong>Style :</strong> ${beer.style}</p>
          <p><strong>Teneur en alcool :</strong> ${beer.alcohol_content}%</p>
          <!-- Ajoutez d'autres champs au besoin -->
        </li>`).join('')}
      </ul>
    </div>`).join(''));

  } catch (e) {
    console.error(e);
    res.status(500).send("Erreur lors de la connexion à la base de données");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
