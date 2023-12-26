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
  background: url('src/assets/main-background.png') center / cover no-repeat;

  @media (max-width: 600px) {
    background: url('src/assets/main-background.png') right / 150% no-repeat;
  }
`;

const Title = styled.h1`
  color: #50473f;
  margin: 1rem 0;
`;

const SearchContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  max-width: 20rem;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Title>Search for books</Title>
      <SearchContainer>
        <SearchField />
        <CategorySelect />
        <OrderSelect />
      </SearchContainer>
    </StyledHeader>
  );
};
