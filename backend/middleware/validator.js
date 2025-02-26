import { body, validationResult } from "express-validator";
//dirver registration validation rules
export const driverValidationRules = () => [
  body("licenseNo").notEmpty().withMessage("licenseNo is required"),
  body("firstName").notEmpty().withMessage("firstname is required"),
  body("lastName").notEmpty().withMessage("lastname is required"),
  body("street").notEmpty().withMessage("street is required"),
  body("barangay").notEmpty().withMessage("barangay is required"),
  body("municipality").notEmpty().withMessage("municipality is required"),
  body("province").notEmpty().withMessage("province is required"),
  body("zipCode").notEmpty().withMessage("zipCode is required"),
  body("nationality").notEmpty().withMessage("nationality is required"),
  body("sex").notEmpty().withMessage("sex is required"),
  body("birthDate").notEmpty().withMessage("birthDate is required"),
  body("civilStatus").notEmpty().withMessage("civilStatus is required"),
  body("birthPlace").notEmpty().withMessage("birthPlace is required"),
  body("issueDate").notEmpty().withMessage("issueDate is required"),
  body("expiryDate").notEmpty().withMessage("expiryDate is required"),
];

//admin registration validation rules
export const registrationValidationRules = () => [
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
  body("email").notEmpty().withMessage("email is required")
]

// Middleware to handle validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((error) => error.msg),
    });
  }
  next();
};
