import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: '16kb'}));

// routes imports
import surahRouter from "./routes/surah.routes.js";

// routes declaration
app.use('/api/v1/surahs', surahRouter);

export { app }