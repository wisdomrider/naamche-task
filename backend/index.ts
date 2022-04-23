import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import globalRoutes from "./src/routes";

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI as string, {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log("Error while connecting to db: ", err));

app.use("/", globalRoutes);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || 500).json({
    error: error.message || "Something went wrong or page not found.",
  });
});
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
