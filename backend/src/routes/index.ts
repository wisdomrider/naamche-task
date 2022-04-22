import { Router } from "express";
import { validateUser } from "../middlewares/validateUser";
import noteRoutes from "./noteRoutes";
import userRoutes from "./userRoutes";
const router = Router();

router.use("/users", userRoutes);
router.use("/notes", validateUser, noteRoutes);

export default router;
