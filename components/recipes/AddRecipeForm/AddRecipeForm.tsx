"use client";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./AddRecipeForm.module.css";
import { validationSchema } from "./validationSchema";
import {
  RecipeFormValues,
  Ingredient,
} from "./types";
import IngredientsBlock from "./IngredientsBlock";
import ImageUpload from "./ImageUpload";

const initialValues: RecipeFormValues = {
  name: "",
  descr: "",
  cookingTime: "",
  cals: "",
  category: "",
  instruction: "",
  ingredients: [],
  recipeImg: null,
};

export default function AddRecipeForm() {
  const [isLoading, setIsLoading] =
    useState(false);

  const router = useRouter();

  
  const categories = [
    { _id: "1", name: "Soup" },
    { _id: "2", name: "Breakfast" },
    { _id: "3", name: "Dessert" },
  ];

  const ingredients: Ingredient[] = [
    { _id: "1", name: "Broccoli" },
    { _id: "2", name: "Eggs" },
    { _id: "3", name: "Butter" },
  ];

  const handleSubmit = async (
    values: RecipeFormValues
  ) => {
    try {
 setIsLoading(true);

 const formData = new FormData();

 formData.append("name",   values.name );
 formData.append("descr",  values.descr );
formData.append("cookingTime",  values.cookingTime);
 if (values.cals) { formData.append(  "cals",  values.cals); }
  formData.append("category",   values.category );
 formData.append("instruction",  values.instruction );
  formData.append("ingredients",  JSON.stringify(values.ingredients  ));
        if (values.recipeImg) { formData.append("recipeImg", values.recipeImg); }
        console.log(values);
 toast.success("Recipe created!" );
 router.push("/recipes");
    } catch (error) {
      console.error(error);
 toast.error(  "Something went wrong"
 );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
 <Formik  initialValues={initialValues}
  validationSchema={
 validationSchema
 }
 onSubmit={handleSubmit}>
 {({values, setFieldValue, }) => (<Form className={styles.form}>
<div className={styles.topSection}>  <div>
 <h2  className={styles.sectionTitle} >  General Information</h2>
<div className={styles.fieldWrapper}>
                          
<label>Recipe title</label>
<Field name="name" className={ styles.input }/>

<ErrorMessage  name="name"component="p"
 className={ styles.error }/>
</div>

<div
 className={
styles.fieldWrapper
 }
 >
 <label>
 Description
 </label>

 <Field
 as="textarea"
 name="descr"
 className={
 styles.textarea
 }
 />

 <ErrorMessage
 name="descr"
 component="p"
 className={
 styles.error
 }
  />
 </div>

<div
className={
 styles.fieldWrapper
  }
>
 <label>
 Cooking time </label>
 <Field
  type="number"
  name="cookingTime"
 className={
 styles.input } />

   <ErrorMessage
  name="cookingTime"
   component="p"
   className={
 styles.error
   }
  />
  </div>

  <div className={styles.row}>
   <div
   className={
styles.fieldWrapper
   }
  >
   <label> Calories </label>
 <Field
 type="number"
 name="cals"
 className={
 styles.input
 } />
 </div>
<div
className={
 styles.fieldWrapper
 }
 >
 <label>
 Category
 </label>
 <Field
 as="select"
 name="category"
  className={
 styles.select
  }
 >
<option value="">
  Select
 </option>

 {categories.map(
 (
 category
 ) => (
 <option
 key={
 category._id
 }
 value={
 category._id
 }
 >
 { category.name }
</option>
 )
 )}
</Field>
 <ErrorMessage
  name="category"
 component="p"
className={
  styles.error
 }
/>
 </div>
 </div>
</div>
<ImageUpload
 setFieldValue={
 setFieldValue
 }
 />
</div>

<IngredientsBlock
ingredients={
  ingredients
 }
 values={values}
 setFieldValue={
   setFieldValue
 }
 />
<div
 className={
  styles.fieldWrapper
 }
 >
 <h2
 className={
 styles.sectionTitle
  }
 >
 Instructions
 </h2>

<Field
 as="textarea"
 name="instruction"
 className={
 styles.textarea
  }
 />

 <ErrorMessage
  name="instruction"
component="p"
 className={
styles.error
  }
 />
</div>

 <button
type="submit"
disabled={isLoading}
className={
styles.button
 }
 >
 {isLoading ? "Publishing..."
: "Publish Recipe"}
 </button>
</Form>
  )}
 </Formik>
    </div>
  );
}