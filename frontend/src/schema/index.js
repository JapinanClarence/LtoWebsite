import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const CreateDriverSchema = z.object({
  licenseNo: z
    .string()
    .regex(/^[a-zA-Z0-9]{3}-\d{2}-\d{6}$/, "Invalid license number format"),
  firstName: z.string().min(1, {
    message: "Firstname is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, {
    message: "Lastname is required",
  }),
  street: z.string().min(1, {
    message: "Street is required",
  }),
  barangay: z.string().min(1, {
    message: "Barangay is required",
  }),
  municipality: z.string().min(1, {
    message: "Municipality is required",
  }),
  province: z.string().min(1, {
    message: "Province is required",
  }),
  zipCode: z
    .string()
    .min(4, {
      message: "Zip code must be exactly 4 characters",
    })
    .max(4, {
      message: "Zip code must be exactly 4 characters.",
    }),
  nationality: z.string().min(1, {
    message: "Nationality is required",
  }),
  sex: z.string().min(1, {
    message: "Sex is required",
  }),
  birthDate: z.date({
    required_error: "Date of birth is required.",
  }),
  civilStatus: z.string().min(1, {
    message: "Civil status is required",
  }),
  issueDate: z.date({
    required_error: "Issue date is required.",
  }),
  expiryDate: z.date({
    required_error: "Expiry date is required.",
  }),
  birthPlace: z.string().min(1, {
    message: "Birthplace is required",
  }),
});
