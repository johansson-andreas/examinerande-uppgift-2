import { Response, Request, Express, NextFunction } from "express";
import { TaskSchema, PartialTaskSchema } from "../../types/schemas";
import mongoose from "mongoose";
import { Task } from "../../models/Task";
import { User } from "../../models/User";

class TaskController {
  async getTask(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const response = await Task.findById(id);
      if (!response)
        return res.status(404).json({ error: `Task with ID ${id} not found` });
      res.status(200).json({ message: response });
    } catch (error) {
      next(error);
    }
  }
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const newTask = TaskSchema.parse({ ...req.body, createdAt: new Date() });
      const { assignedTo } = newTask;

      if (assignedTo) {
        if (!mongoose.isValidObjectId(assignedTo))
          return res
            .status(400)
            .json({ message: "Invalid ID format for assigned user" });
        const userExists = await User.exists({ _id: assignedTo }).lean();
        if (!userExists)
          return res.status(404).json({ message: "Assigned user not found" });
      }

      const response = await Task.create(newTask);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async deleteTask(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const response = await Task.findByIdAndDelete(id);
      if (!response)
        return res.status(404).json({ error: `Task with ID ${id} not found` });
      res.status(200).json({ message: "Task succesfully deleted" });
    } catch (error) {
      next(error);
    }
  }
  async updateTask(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const parsed = PartialTaskSchema.parse(req.body);

      const { assignedTo, status } = parsed;

      if (assignedTo) {
        if (!mongoose.isValidObjectId(assignedTo))
          return res
            .status(400)
            .json({ message: "Invalid ID format for assigned user" });
        const userExists = await User.exists({ _id: assignedTo }).lean();
        if (!userExists)
          return res.status(404).json({ message: "Assigned user not found" });
      }

      if (status === "done") parsed.finishedAt = new Date();
      const response = await Task.findByIdAndUpdate(id, parsed, {
        new: true,
      });

      if (!response) return res.status(404).json({ message: "Task not found" });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const taskController = new TaskController();
