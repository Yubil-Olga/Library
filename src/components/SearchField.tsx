import { useState } from 'react';
import SearchLogo from 'src/assets/icons/search.svg?react';
import { useAppDispatch } from 'src/store/store';
import { searchBooks, startNewSearch } from 'src/store/reducers/searchBookSlice';
import styled from 'styled-components';

const InputContainer = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #fff;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  outline: none;
  border: none;
`;

const SearchButton = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? '' : 'pointer')};
`;

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
    <InputContainer>
      <StyledInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="search"
      />
      <SearchButton onClick={hangleSearch} disabled={!search}>
        <SearchLogo />
      </SearchButton>
    </InputContainer>
  );
};
