import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nzmshr.mongodb.net/parcelDB?retryWrites=true&w=majority`;

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

    const db = client.db("parcelDB"); // database name
    const parcelsCollection = db.collection("parcels"); //collections

    app.get("/parcels", async (req, res) => {
      try {
        const result = await parcelsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch parcels" });
      }
    });


    //myparcel api call 
    app.get("/myparcels", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    const result = await parcelsCollection
      .find({ email: email })
      .sort({ creation_date: -1 }) // newest first
      .toArray();

    res.send(result);

  } catch (error) {
    res.status(500).send({ error: "Failed to fetch parcels" });
  }
});

//get the parcel by specific id 


app.get('/parcels/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // ✅ Validate ID first
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid parcel ID" });
    }

    const parcel = await parcelsCollection.findOne({
      _id: new ObjectId(id)
    });

    if (!parcel) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    res.status(200).send(parcel);

  } catch (error) {
    console.error("Error fetching parcel:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

  app.post("/parcels", async (req, res) => {
  try {
    const parcel = req.body;
    const result = await parcelsCollection.insertOne(parcel);

    res.send({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId,
    });

  } catch (error) {
    res.status(500).send({ error: "Failed to save parcel" });
  }
});

  //delete parcel 
  app.delete("/parcels/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await parcelsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.send(result);

  } catch (error) {
    res.status(500).send({ error: "Failed to delete parcel" });
  }
});

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" Parcel Delivery Server is Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
