const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://RuthRodrigues:ruth10@cluster0.dvlqj.mongodb.net/";

const client = new MongoClient(uri);

async function checkConnection() {
  try {
    
    await client.connect();

    const resultPing = await client.db("admin").command({ ping: 1 });

    if (resultPing.ok === 1) {
      console.log("Servidor MongoDB ativo!");

      const replicaStatus = await client.db("admin").command({ replSetGetStatus: 1 });
      
      console.log("Hosts que compõem o cluster:");
      replicaStatus.members.forEach(member => {
        console.log(`- Host: ${member.name}, Estado: ${member.stateStr}`);
      });
    }
  } catch (error) {
  
    console.error("Erro ao conectar ao servidor MongoDB:", error.message);
  } finally {
 
    await client.close();
  }
}

checkConnection();
