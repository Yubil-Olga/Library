import styled from 'styled-components';
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
  padding: 15rem 1rem;
  display: grid;
  grid-gap: 2rem;
  alin-items: center;
`;

const BooksContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(5, 1fr);
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
        <p>Найдено {totalItems} книг</p>
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
        {isLoading && <Loader>Loading books...</Loader>}
        {books.length > 0 && <button onClick={fetchBooks}>Load more</button>}
      </MainContainer>
    </MainLayout>
  );
}

export default App;
