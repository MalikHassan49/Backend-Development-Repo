import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db.js";
dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is listening on ${process.env.PORT}`);
      app.on("error", () => {
        console.log("ERROR", error);
        throw error;
      })
    })
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);

  })
