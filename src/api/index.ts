import { Router } from "express";
import TaskRouter from "./routes/Task.routes";
import UserRoutes from "./routes/User.routes";
import { errorHandler } from "../middleware/errorHandling";



const router = Router();

router.use("/task/", TaskRouter)
router.use("/user/", UserRoutes)
router.use(errorHandler);

export default router;