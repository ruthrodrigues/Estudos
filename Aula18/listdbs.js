async function main() {
    const { MongoClient } = require('mongodb');
    
    const uri = "mongodb+srv://RuthRodrigues:ruth10@cluster0.dvlqj.mongodb.net/";
  
    const client = new MongoClient(uri);
  
    try {
    
      await client.connect();
  
      await listDatabases(client);
  
    } catch (e) {
      console.error("Erro na conexão:", e);
    } finally {

      await client.close();
    }
  }
  
  async function listDatabases(client) {
    try {
      
      const databasesList = await client.db().admin().listDatabases();
  
      if (databasesList.ok === 1) {
        console.log("Consulta realizada com sucesso!");
        let totalSize = 0;
  
        console.log("Bancos de dados e seus tamanhos em disco:");
  
        databasesList.databases.forEach(db => {
          console.log(`- Banco: ${db.name}, Tamanho: ${db.sizeOnDisk} bytes`);
          totalSize += db.sizeOnDisk; 
        });

        console.log(`Tamanho total do cluster: ${totalSize} bytes`);
  
      } else {
        console.error("Erro: Não foi possível listar os bancos de dados.");
      }
    } catch (error) {

      console.error("Erro ao listar bancos de dados:", error.message);
    }
  }
  
  main().catch(console.error);
  