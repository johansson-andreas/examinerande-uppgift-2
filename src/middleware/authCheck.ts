import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { DecodedToken, ROLES } from "../types/types";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Access denied" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as DecodedToken;
    console.log(decoded)
    req.user = { id: decoded.userId, role: decoded.role };
    if (decoded.userId === id || decoded.role === ROLES.ADMIN) {
      return next();
    }
    return res.status(403).json({ error: "Forbidden" });
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
