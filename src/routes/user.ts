import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../entities/User";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving users" });
  }
});

export default router;