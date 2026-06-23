import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

export const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(64, "Maximum 64 characters")
    .required("Recipe title is required"),

  descr: Yup.string()
    .trim()
    .max(200, "Maximum 200 characters")
    .required("Description is required"),

  cookingTime: Yup.number()
    .typeError("Cooking time must be a number")
    .min(1, "Minimum 1 minute")
    .max(360, "Maximum 360 minutes")
    .required("Cooking time is required"),

  cals: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(1, "Minimum 1 calorie")
    .max(10000, "Maximum 10000 calories"),

  category: Yup.string()
    .required("Category is required"),

  ingredients: Yup.array()
    .of(
      Yup.object({
        ingredientId: Yup.string().required("Ingredient is required"),
        ingredientAmount: Yup.string()
          .trim()
          .max(10, "Maximum 10 characters")
          .required("Amount is required"),
      })
    )
    .min(2, "Add at least 2 ingredients")
    .max(16, "Maximum 16 ingredients")
    .required("Ingredients list is required"),

  instruction: Yup.string()
    .trim()
    .max(1200, "Maximum 1200 characters")
    .required("Instruction is required"),

  recipeImg: Yup.mixed<File>()
    .nullable()
    .notRequired()
    .test("fileSize", "Image size must be less than 2MB", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only JPG, JPEG, PNG, WEBP are allowed", (value) => {
      if (!value) return true;
      return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
    }),
});