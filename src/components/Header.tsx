import styled from 'styled-components';
import { SearchField } from 'src/components/SearchField';
import { CategorySelect } from 'src/components/CategorySelect';
import { OrderSelect } from 'src/components/OrderSelect';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gray;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <h1>Search for books</h1>
      <SearchField />
      <CategorySelect />
      <OrderSelect />
    </StyledHeader>
  );
};
