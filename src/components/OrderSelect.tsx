import { selectOrderBy } from 'src/store/reducers/searchBookSlice';
import { useAppDispatch } from 'src/store/store';
import { CustomSelect } from './CustomSelect';

const orderBy = ['relevance', 'newest'] as const;

export type OrderType = (typeof orderBy)[number];

export const OrderSelect = () => {
  const dispatch = useAppDispatch();

  return (
    <CustomSelect
      label="Order by"
      options={orderBy}
      defaultValue={'relevance'}
      onSelect={(v) => dispatch(selectOrderBy(v as OrderType))}
    />
  );
};
