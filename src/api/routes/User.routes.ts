import { Router } from "express";
import { userController } from "../controllers/User.controllers";

const router = Router();

router.get("/:id", userController.getUser)
router.post("/", userController.createUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)




export default router;