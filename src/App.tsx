import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { searchBooks } from 'src/store/reducers/searchBookSlice';
import { Header } from 'src/components/Header';
import { Card } from 'src/components/Card';

const MainLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
`;

const MainContainer = styled.main`
  padding: 17rem 1rem;
  display: grid;
  grid-gap: 2rem;
  align-items: center;
`;

const TotalInfo = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const BooksContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
`;

const rotation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Loader = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 2rem auto;
  border: 0.25rem solid ${({ theme }) => theme.colors.bgDark};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

const LoadMoreButton = styled.button`
  border-radius: 2rem;
  padding: 1rem 3rem;
  width: max-content;
  background: ${({ theme }) => theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgDark};
    color: #fff;
  }
`;

function App() {
  const dispatch = useAppDispatch();
  const { books, totalItems, isLoading } = useAppSelector((x) => x.searchBooks);

  const fetchBooks = () => {
    dispatch(searchBooks());
  };

  return (
    <MainLayout>
      <Header />
      <MainContainer>
        {totalItems > 0 && !isLoading && (
          <TotalInfo>
            Найдено книг: <b>{totalItems}</b>
          </TotalInfo>
        )}
        <BooksContainer>
          {books.map((book) => (
            <Card
              key={book.etag}
              title={book.volumeInfo.title}
              authors={book.volumeInfo?.authors || []}
              category={book.volumeInfo?.categories ? book.volumeInfo.categories[0] : ''}
              imageUrl={
                book.volumeInfo.imageLinks?.thumbnail ||
                book.volumeInfo.imageLinks?.smallThumbnail ||
                ''
              }
            />
          ))}
        </BooksContainer>
        {isLoading && <Loader />}
        {books.length > 0 && <LoadMoreButton onClick={fetchBooks}>Load more</LoadMoreButton>}
      </MainContainer>
    </MainLayout>
  );
}

export default App;
