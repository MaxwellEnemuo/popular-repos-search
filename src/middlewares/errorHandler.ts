import { Response, Request } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err: any, req: Request, res: Response) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default errorHandler;
