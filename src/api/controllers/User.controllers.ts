import { Response, Request, Express, NextFunction } from "express";
import { PartialUserSchema, UserSchema } from "../../types/schemas";
import bcrypt from "bcrypt";
import { User } from "../../models/User";

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const response = await User.findById(id);
      if(!response) return res.status(404).json({error:`User with ID ${id} not found`})
      res.status(200).json({ message: response });
    } catch (error) {
      next(error);
    }
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
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
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const response = await User.findByIdAndDelete(id);
      if(!response) return res.status(404).json({error:`User with ID ${id} not found`})

      res.status(200).json({ message: "User succesfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const updatedUser = PartialUserSchema.parse(req.body);

      let hashedPassword;
      if (updatedUser.password) hashedPassword = await bcrypt.hash(updatedUser.password, 10);

      const response = await User.findByIdAndUpdate(id, {
        ...updatedUser,
        password: hashedPassword,
      });
      if(!response) return res.status(404).json({error:`User with ID ${id} not found`})

      res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
