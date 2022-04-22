import { Router } from "express";
import {
  getUserNames,
  userLogin,
  userRegister,
} from "../controllers/userController";
import { validateUser } from "../middlewares/validateUser";
const router = Router();

// swagger docs

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/names/:search", validateUser, getUserNames);
export default router;
