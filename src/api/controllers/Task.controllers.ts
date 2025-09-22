import { Response, Request, Express } from "express";

class TaskController {
  async getUser(req: Request, res: Response) {
    try {
    } catch (error) {}
    res.status(200).json({ message: "OK" });
  }
    async createUser(req: Request, res: Response) {
    try {
    } catch (error) {}
    res.status(200).json({ message: "OK" });
  }
    async deleteUser(req: Request, res: Response) {
    try {
    } catch (error) {}
    res.status(200).json({ message: "OK" });
  }
    async updateUser(req: Request, res: Response) {
    try {
    } catch (error) {}
    res.status(200).json({ message: "OK" });
  }
}

export const taskController = new TaskController();