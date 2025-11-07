import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

const adapter = new JSONFile("db.json");
const defaultData = { products: [] };
const db = new Low(adapter, defaultData);

await db.read();

app.get("/", (req, res) => {
  res.json({ status: "Tastify Backend is running!" });
});

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
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
