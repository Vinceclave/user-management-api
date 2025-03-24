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


// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await userRepository.findOneBy({ id });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving user" });
    }
  });

export default router;