async function main() {
    const { MongoClient } = require('mongodb');
    
   
    const uri = "mongodb+srv://RuthRodrigues:ruth10@cluster0.dvlqj.mongodb.net/";
    const client = new MongoClient(uri);
  
    try {
   
      await client.connect();
  
      await findTopListings(client, 10);
  
    } catch (e) {
      console.error('Erro ao conectar ou consultar:', e);
    } finally {

      await client.close();
    }
  }
  
  async function findTopListings(client, resultsLimit) {
    
    const cursor = client
      .db('sample_airbnb')
      .collection('listingsAndReviews')
      .find({
        
        review_scores_rating: { $gte: 80 },
        name: { $ne: "" } 
      })
      .sort({ review_scores_rating: -1 }) 
      .project({ name: 1, listing_url: 1, review_scores_rating: 1 })  
      .limit(resultsLimit);  
  
    const results = await cursor.toArray();
  
    if (results.length > 0) {
      console.log(`Found ${results.length} listing(s):`);
      
      results.forEach((result, i) => {
        console.log();
        console.log(`${i + 1}. Name: ${result.name}`);
        console.log(`   Listing URL: ${result.listing_url}`);
        console.log(`   Review Score: ${result.review_scores_rating}`);
      });
    } else {
      console.log('Nenhuma propriedade encontrada com a avaliação superior ou igual a 80.');
    }
  }
  
  main().catch(console.error);
  