import { Field } from 'formik';
import { categories } from '@/data/categories';

export default function CategorySelect() {
  return (
    <div>
      <label>Category</label>

      <Field as="select" name="category">
        <option value="">Select</option>

        {categories.map((c: string) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Field>
    </div>
  );
}