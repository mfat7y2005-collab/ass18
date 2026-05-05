import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redisService } from "../services";
import { UserModel } from "../DB/model";

// ================= AUTHENTICATION =================
export const authentication = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      // 1. check token
      if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new Error("Token required"));
      }

      const token = authorization.split(" ")[1];

      if (!token) {
        return next(new Error("Token missing"));
      }

      // 2. verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      if (!decoded?.id) {
        return next(new Error("Invalid token"));
      }

      // 3. check revoke (redis)
      if (decoded.jti) {
        const isRevoked = await redisService.get(
          `revoked_token:${decoded.jti}`
        );

        if (isRevoked) {
          return next(new Error("Token revoked"));
        }
      }

      // 4. get user
      const user = await UserModel.findOne(decoded.id);

      if (!user) {
        return next(new Error("User not found"));
      }

      // 5. check account status
      if (user.isDeleted || user.status === "blocked") {
        return next(new Error("User disabled"));
      }

      (req as any).user = user;
      (req as any).decoded = decoded;

      next();
    } catch (err) {
      return next(new Error("Authentication failed"));
    }
  };
};


