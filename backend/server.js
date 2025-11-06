import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const adapter = new JSONFile("db.json");
const defaultData = { products: [] };
const db = new Low(adapter, defaultData);

await db.read();

app.get("/api/products", (req, res) => {
  res.json(db.data.products);
});

app.get("/api/products/category/:cat", (req, res) => {
  const cat = req.params.cat;
  const items = db.data.products.filter((p) => p.category === cat);
  res.json(items);
});

app.get("/api/products/search/:query", (req, res) => {
  const term = req.params.query.toLowerCase();
  const results = db.data.products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
  );
  res.json(results);
});

app.post("/api/products", async (req, res) => {
  db.data.products.push(req.body);
  await db.write();
  res.json({ status: "Product added" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on port", PORT));
