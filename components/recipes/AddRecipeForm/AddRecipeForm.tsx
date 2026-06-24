 'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import styles from "./AddRecipeForm.module.css";
import { validationSchema } from "./validationSchema";
import type { RecipeFormValues, Ingredient } from "@/types/recipe";

import IngredientsBlock from "../IngredientsBlock/IngredientsBlock";
import ImageUpload from "../ImageUpload/ImageUpload";

import {
  createRecipeApi,
  getCategoriesApi,
  getIngredientsApi,
} from "@/lib/api/recipes";

import { Oval } from "react-loader-spinner";


type Category = { _id: string; name: string; };

const initialValues: RecipeFormValues = {
  name: "",
  descr: "",
  cookingTime: "",
  cals: "",
  category: "",
  ingredients: [],
  instruction: "",
  recipeImg: null,
};

export default function AddRecipeForm() {
  const [isLoading, setIsLoading] = useState(false);
 
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, ings] = await Promise.all([getCategoriesApi(), getIngredientsApi()]);
        setCategories(cats);
        setIngredients(ings);
      } catch {
        toast.error("Failed to load data");
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (values: RecipeFormValues, helpers: FormikHelpers<RecipeFormValues>) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", values.name);
      formData.append("description", values.descr);
      formData.append("time", String(values.cookingTime));
      formData.append("category", values.category);
      formData.append("instructions", values.instruction);
      if (values.cals) formData.append("calories", String(values.cals));
      formData.append("ingredients", JSON.stringify(values.ingredients.map(i => ({ ingredient: i.ingredientId, amount: i.ingredientAmount }))));
      if (values.recipeImg) formData.append("photo", values.recipeImg);

    const response = await createRecipeApi(formData);

const recipeId = response?._id || response?.data?._id;

if (recipeId) {
  router.push(`/recipes/${recipeId}`);
}
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to publish recipe");
    } finally {
      setIsLoading(false);
      helpers.setSubmitting(false);
    }
  };

  

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <h2 className={styles.sectionTitle}>Add Recipe</h2>
            <div className={styles.topSection}>
              <div className={styles.photoWrapper}>
                <ImageUpload setFieldValue={setFieldValue} />
              </div>
              <div className={styles.leftColumn}>
                <h3 className={styles.blockTitle}>General Information</h3>
                <div className={styles.fieldWrapper}>
                  <label>Recipe Title</label>
                  <Field name="name" placeholder="Enter the name of your recipe" className={styles.input} />
                  <ErrorMessage name="name" component="div" className={styles.error} />
</div>
                <div className={styles.fieldWrapper}>
                  <label>Recipe Description</label>
                  <Field as="textarea" name="descr" placeholder="Enter a brief description" className={styles.textarea} />
                  <ErrorMessage name="descr" component="div" className={styles.error} />
                </div>
                <div className={styles.fieldWrapper}>
                  <label>Cooking time (minutes)</label>
                  <Field type="number" name="cookingTime" className={styles.input} />
                  <ErrorMessage name="cookingTime" component="div" className={styles.error} />
                </div>
                <div className={styles.row}>
                  <div className={styles.fieldWrapper}>
                    <label>Calories</label>
                    <Field type="number" name="cals" className={styles.input} />
                    <ErrorMessage name="cals" component="div" className={styles.error} />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <label>Category</label>
                    <Field as="select" name="category" className={styles.select}>
                      <option value="">Select category</option>
                      {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                    </Field>
                    <ErrorMessage name="category" component="div" className={styles.error} />
                  </div>
                </div>
              </div>
            </div>
            <IngredientsBlock ingredients={ingredients} values={values} setFieldValue={setFieldValue} />
            <div className={styles.instructionsSection}>
              <h2 className={styles.sectionTitle}>Instructions</h2>
              <div className={styles.instructionsWrapper}>
                <Field as="textarea" name="instruction" className={styles.instructionTextarea} placeholder="Enter a text" />
                <ErrorMessage name="instruction" component="div" className={styles.error} />
              </div>
            </div>
           <button
  type="submit"
  className={styles.button}
  disabled={isLoading}
>
  {isLoading ? (
    <Oval
      height={18}
      width={18}
      strokeWidth={5}
      color="#fff"
    />
  ) : (
    "Publish Recipe"
  )}
</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}