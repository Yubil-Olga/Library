import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetVolumesApi, VolumeApi, googleBooks } from 'src/api/googleBooks';
import { RootState } from 'src/store/store';
import { CategoryType } from 'src/components/CategorySelect';
import { OrderType } from 'src/components/OrderSelect';

const MAX_RESULTS = 30;

const initialState: {
  books: VolumeApi[];
  totalItems: number;
  query: string;
  category: CategoryType;
  orderBy: OrderType;
  nextPage: number;
  isLoading: boolean;
  error: string;
} = {
  books: [],
  totalItems: 0,
  query: '',
  category: 'all',
  orderBy: 'relevance',
  nextPage: 0,
  isLoading: false,
  error: '',
};

export const searchBooks = createAsyncThunk('books/searchBooks', async (_, thunkAPI) => {
  try {
    const { query, category, orderBy, nextPage } = (thunkAPI.getState() as RootState).searchBooks;

    const categoryQuery = category !== 'all' ? `+subject:${category}` : '';
    const queryString = `q=${query}${categoryQuery}&orderBy=${orderBy}&startIndex=${
      nextPage * MAX_RESULTS
    }&maxResults=${MAX_RESULTS}`;

    return await googleBooks.getVolumes(queryString);
  } catch (e) {
    return thunkAPI.rejectWithValue('Error fetching books');
  }
});

export const searchBookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    startNewSearch(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.nextPage = 0;
      state.books = [];
    },
    selectCategory(state, action: PayloadAction<CategoryType>) {
      state.category = action.payload;
    },
    selectOrderBy(state, action: PayloadAction<OrderType>) {
      state.orderBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchBooks.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(searchBooks.fulfilled, (state, action: PayloadAction<GetVolumesApi>) => {
      state.isLoading = false;
      if (action.payload.items) {
        state.books.push(...action.payload.items);
        state.nextPage += 1;
      } else {
        state.nextPage = 0;
      }
      state.totalItems = action.payload.totalItems;
      state.error = '';
    });
    builder.addCase(searchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.totalItems = 0;
      state.books = [];
      state.error = action.payload as string;
    });
  },
});

export const { startNewSearch, selectCategory, selectOrderBy } = searchBookSlice.actions;

export const searchBooksReducer = searchBookSlice.reducer;
