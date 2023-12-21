import { useAppDispatch } from 'src/store/store';
import { selectCategory } from 'src/store/reducers/searchBookSlice';

const categories = [
  'all',
  'art',
  'biography',
  'computers',
  'history',
  'medical',
  'poetry',
] as const;

export type CategoryType = (typeof categories)[number];

export const CategorySelect = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <label htmlFor="category">Category</label>
      <select
        aria-label="category"
        id="category"
        onChange={(e) => dispatch(selectCategory(e.target.value as CategoryType))}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
