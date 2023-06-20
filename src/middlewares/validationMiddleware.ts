import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validationMiddleware = [
  body("date")
    .not()
    .isEmpty()
    .withMessage("Date is required")
    .bail()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM-DD format."),
  body("perPage")
    .isInt()
    .withMessage("It must be an integer.")
    .bail()
    .isIn([10, 50, 100])
    .withMessage("Limit must be either 10, 50 or 100.")
    .optional({ nullable: true }),
  body("language").isString().withMessage("Language must be a string.").optional({ nullable: true }),
];

export const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
