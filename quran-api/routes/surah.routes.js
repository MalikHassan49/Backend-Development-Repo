import Router from "express";
import { getSurahById } from "../controllers/surah.controller.js";

const router = Router();

router.route("/chapter/:id").get(getSurahById);

export default router;