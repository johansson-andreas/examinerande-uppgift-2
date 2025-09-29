import { ROLES } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: ROLES;
        email?: string;
      };
    }
  }
}