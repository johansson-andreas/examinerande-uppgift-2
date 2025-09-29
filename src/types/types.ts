export type DecodedToken = {
  userId: string;
  iat: number;
  exp?: number;
  role: ROLES;
};

export enum ROLES {
  USER = "user",
  ADMIN = "admin",
}
