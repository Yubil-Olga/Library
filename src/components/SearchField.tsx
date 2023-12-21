import { useState } from 'react';
import SearchLogo from 'src/assets/icons/search.svg?react';
import { useAppDispatch } from 'src/store/store';
import { searchBooks, startNewSearch } from 'src/store/reducers/searchBookSlice';

export const SearchField = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const hangleSearch = async () => {
    if (!search) return;
    dispatch(startNewSearch(search));
    dispatch(searchBooks());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      hangleSearch();
    }
  };

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="search"
      />
      <button onClick={hangleSearch} disabled={!search}>
        <SearchLogo />
      </button>
    </div>
  );
};
