import { Router } from "express";
import { taskController } from "../controllers/Task.controllers";

const router = Router();

router.get("/:id", taskController.getUser)
router.post("/:id", taskController.createUser)
router.put("/:id", taskController.updateUser)
router.delete("/:id", taskController.deleteUser)




export default router;