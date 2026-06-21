import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .max(64, "Maximum 64 characters")
    .required("Recipe title is required"),

  descr: Yup.string()
    .max(200, "Maximum 200 characters")
    .required("Description is required"),

  cookingTime: Yup.number()
    .typeError("Cooking time must be a number")
    .min(1, "Minimum 1 minute")
    .max(360, "Maximum 360 minutes")
    .required("Cooking time is required"),

  cals: Yup.number()
    .nullable()
    .transform((v, o) => (o === "" ? null : v))
    .min(1, "Minimum 1 calorie")
    .max(10000, "Maximum 10000 calories"),

  category: Yup.string().required("Category is required"),

  ingredients: Yup.array()
    .of(
      Yup.object({
        ingredientId: Yup.string().required(),
        ingredientAmount: Yup.string()
          .max(10, "Maximum 10 characters")
          .required("Ingredient amount is required"),
      })
    )
    .min(2, "Minimum 2 ingredients")
    .max(16, "Maximum 16 ingredients")
    .required(),

  instruction: Yup.string()
    .max(1200, "Maximum 1200 characters")
    .required("Instruction is required"),

  recipeImg: Yup.mixed()
    .nullable()
    .test("fileSize", "Image must be less than 2MB", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only jpg, jpeg, png, webp allowed", (value) => {
      if (!value) return true;

      return (
        value instanceof File &&
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(value.type)
      );
    }),
});