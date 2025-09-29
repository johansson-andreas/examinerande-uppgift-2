import { Router } from "express";
import { taskController } from "../controllers/Task.controllers";
import { idCheck } from "../../middleware/idCheck";
import { authCheck } from "../../middleware/authCheck";

const router = Router();

router.get("/:id", idCheck, taskController.getTask)
router.post("/", taskController.createTask)
router.put("/:id", idCheck, taskController.updateTask)
router.delete("/:id", authCheck, idCheck, taskController.deleteTask)




export default router;