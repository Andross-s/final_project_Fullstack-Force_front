import * as Yup from "yup";

export const RegistrationFormValidationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Incorrect email format!")
        .max(128, "Email too long! Maximum 128 characters allowed.")
        .required("Email is required!"),
    username: Yup.string()
        .trim()
        .min(2, "Name too short. Minimum 2 characters required.")
        .max(16, "Name too long. Maximum 16 characters.")
        .required("Name is required!"),
    password: Yup.string()
        .min(8, "Password too short. Minimum 8 characters required.")
        .max(128, "Password too long. Maximum 128 characters allowed.")
        .required("Password is required!"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match!')
        .required('Please confirm your password!'),
});

