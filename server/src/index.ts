import express, { ErrorRequestHandler } from "express";
import userRoute from "./routes/userRoutes";
import mongoose from "mongoose";
import { DB, PORT } from "./config";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);



mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
