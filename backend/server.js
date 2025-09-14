const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const Expense = require("./models/Expense");

app.get("/", (req, res) => res.send("Expense Tracker API is up ✅"));

// CRUD
app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

app.post("/expenses", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

app.delete("/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);