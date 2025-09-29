import { Router } from "express";
import { userController } from "../controllers/User.controllers";
import { idCheck } from "../../middleware/idCheck";
import { authCheck } from "../../middleware/authCheck";

const router = Router();

router.get("/:id", authCheck, idCheck, userController.getUser)
router.post("/", userController.createUser)
router.put("/:id", authCheck, idCheck, userController.updateUser)
router.delete("/:id", authCheck, idCheck, userController.deleteUser)
router.post("/login", userController.loginUser)




export default router;