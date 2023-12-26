import { useAppDispatch } from 'src/store/store';
import { selectCategory } from 'src/store/reducers/searchBookSlice';
import { CustomSelect } from './CustomSelect';

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
    <CustomSelect
      label="Category"
      options={categories}
      defaultValue={'all'}
      onSelect={(v) => dispatch(selectCategory(v as CategoryType))}
    />
  );
};
