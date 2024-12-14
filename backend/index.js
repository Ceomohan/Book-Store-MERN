import express from "express";
const app = express();
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type"],
  })
);
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("This is Full Stack Mern Project");
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app is connected to the database");
    app.listen(PORT, () => console.log(`app is running in the port ${PORT}`));
  })
  .catch((error) => console.log(error));
