import { selectOrderBy } from 'src/store/reducers/searchBookSlice';
import { useAppDispatch } from 'src/store/store';

const orderBy = ['relevance', 'newest'] as const;

export type OrderType = (typeof orderBy)[number];

export const OrderSelect = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <label htmlFor="orderBy">Order by</label>
      <select
        aria-label="orderBy"
        id="orderBy"
        onChange={(e) => dispatch(selectOrderBy(e.target.value as OrderType))}
      >
        {orderBy.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
