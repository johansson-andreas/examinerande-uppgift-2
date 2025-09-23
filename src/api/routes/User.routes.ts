import { Router } from "express";
import { userController } from "../controllers/User.controllers";
import { idCheck } from "../../middleware/idCheck";

const router = Router();

router.get("/:id", idCheck, userController.getUser)
router.post("/", userController.createUser)
router.put("/:id", idCheck, userController.updateUser)
router.delete("/:id", idCheck, userController.deleteUser)




export default router;