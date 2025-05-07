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

const validateUserUpdate = [
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
]

const validateMessage = [
  body("subject")
    .isLength({ min: 3, max: 65 })
    .withMessage("Subject must be between 3 and 65 characters."),
  body("message")
    .isLength({ min: 3, max: 300 })
    .withMessage("Message must be between 3 and 300 characters."),
];

export { validateUser, validateMessage, validateUserUpdate };
