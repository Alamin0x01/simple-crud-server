const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://nalaminmmc5:Gx2zhCtEFDgOvop1@cluster0.37liajg.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("userDB").collection("users");
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();

      const result = await cursor.toArray();
      res.send(result);
    });

    // const database = client.db("usersDB");
    // const userCollection = database.collection("users");
    // console.log(userCollection);
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("new user", user);
      // const result = await userCollection.insertOne(user);
      const result = await userCollection.insertOne(user);

      console.log("hello", result);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD IS RUNNING");
});

app.listen(port, () => {
  console.log(`SIMPLE CRUD is running on port, ${port}`);
});

// try{

// }
// catch{

// }
// finally{

// }
