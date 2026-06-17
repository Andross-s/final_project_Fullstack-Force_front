import * as Yup from "yup";

export const validationSchema =
  Yup.object({
    name: Yup.string()
      .max(
        64,
        "Maximum 64 characters"
      )
      .required(
        "Recipe title is required"
      ),

    descr: Yup.string()
      .max(
        200,
        "Maximum 200 characters"
      )
      .required(
        "Description is required"
      ),

    cookingTime: Yup.number()
      .min(
        1,
        "Minimum 1 minute"
      )
      .max(
        360,
        "Maximum 360 minutes"
      )
      .required(
        "Cooking time is required"
      ),

    cals: Yup.number()
      .min(
        1,
        "Minimum 1 calorie"
      )
      .max(
        10000,
        "Maximum 10000 calories"
      )
      .nullable(),

    category: Yup.string()
      .required(
        "Category is required"
      ),

    ingredients: Yup.array()
      .min(
        1,
        "Add at least one ingredient"
      )
      .required(),

    instruction: Yup.string()
      .max(
        1200,
        "Maximum 1200 characters"
      )
      .required(
        "Instruction is required"
      ),

    recipeImg: Yup.mixed()
      .test(
        "fileSize",
        "Image size must be less than 2MB",
        (value) => {
          if (!value) return true;

          return (
            value instanceof File &&
            value.size <=
              2 * 1024 * 1024
          );
        }
      )
      .nullable(),
  });