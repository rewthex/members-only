import { body } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 3 and 10 characters.";

const validateUser = [
  body("username")
    .isLength({ min: 3, max: 12 })
    .withMessage(`Username ${lengthErr}`),
  body("password")
    .isLength({ min: 3, max: 12 })
    .withMessage(`Password ${lengthErr}`),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 3, max: 12 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 3, max: 12 })
    .withMessage(`Last name ${lengthErr}`),
];

export { validateUser };
