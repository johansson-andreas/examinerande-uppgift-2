import { Router } from "express";
import TaskRouter from "./routes/Task.routes";
import UserRoutes from "./routes/User.routes";



const router = Router();

router.use("/task/", TaskRouter)
router.use("/user/", UserRoutes)


export default router;