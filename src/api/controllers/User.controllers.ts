import { Response, Request, Express } from "express";
import { UserSchema } from "../../types/schemas";
import bcrypt from "bcrypt"
import { User } from "../../models/User";
import zod from "zod"
import mongoose, { MongooseError } from "mongoose";

class UserController {
  async getUser(req: Request, res: Response) {
    try {
    } catch (error) {}
    res.status(200).json({ message: "OK" });
  }
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const newUser = UserSchema.parse({
        name: name,
        email: email,
        password: password,
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await User.create({
        ...newUser,
        password: hashedPassword,
      });
      res.status(200).json({ message: "User successfully created" });
    } catch (error: any) {
      if (error instanceof zod.ZodError) {
        res.status(400).json({ message: zod.prettifyError(error) });
      }
      if (error.code === 11000) {
        return res.status(409).json({
          message: "Duplicate key error",
          keyValue: error.keyValue,
        });
      }
      console.log(error)
    }
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

export const userController = new UserController();