import { Response, Request, Express, NextFunction } from "express";
import { PartialUserSchema, UserSchema } from "../../types/schemas";
import bcrypt from "bcrypt";
import { User } from "../../models/User";
import jwt from "jsonwebtoken";

class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await User.findById(id).select("name email role");
      if (!user)
        return res.status(404).json({ error: `User with ID ${id} not found` });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = UserSchema.parse(req.body);

      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      await User.create({
        ...newUser,
        password: hashedPassword,
        role: "user",
      });
      res.status(200).json({ message: "User successfully created" });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found" });
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        return res.status(401).json({ error: "Authentication failed" });
      const secretKey = process.env.JWT_SECRET_KEY!;
      const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const response = await User.findByIdAndDelete(id);
      if (!response)
        return res.status(404).json({ error: `User with ID ${id} not found` });

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
      if (updatedUser.password)
        hashedPassword = await bcrypt.hash(updatedUser.password, 10);

      const response = await User.findByIdAndUpdate(id, {
        ...updatedUser,
        password: hashedPassword,
      });
      if (!response)
        return res.status(404).json({ error: `User with ID ${id} not found` });

      res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
