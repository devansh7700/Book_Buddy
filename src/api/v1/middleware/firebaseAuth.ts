import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "../../../config/firebase";

class AuthenticationError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string = "AUTH_ERROR", status: number = 401) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token: string | undefined = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;

    if (!token) {
      throw new AuthenticationError("Unauthorized: No token provided", "TOKEN_NOT_FOUND");
    }

    const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role;
    next();
  } catch (error: unknown) {
    if (error instanceof AuthenticationError) {
      next(error);
    } else if (error instanceof Error) {
      next(new AuthenticationError(`Unauthorized: ${error.message}`, "TOKEN_INVALID"));
    } else {
      next(new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID"));
    }
  }
};

export default authenticate;