import { FC, useState } from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  authors: string[];
  category: string;
  imageUrl: string;
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: #e6ddd4;
  padding: 2rem 0;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageFailed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 15rem;
  margin: 0 auto;
  color: #50473f;
  border: 1px solid currentColor;
`;

const StyledImage = styled.img`
  width: auto;
  height: 15rem;
  margin: 0 auto;
`;

const Description = styled.div`
  padding: 1rem 2rem 0;
`;

const Category = styled.p`
  color: gray;
  min-height: 1rem;
`;

const BookTitle = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Card: FC<Props> = ({ title, authors, category, imageUrl }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <StyledCard>
      {imageFailed ? (
        <ImageFailed>No image</ImageFailed>
      ) : (
        <StyledImage alt={title} src={imageUrl} onError={() => setImageFailed(true)} />
      )}
      <Description>
        <Category>{category}</Category>
        <BookTitle>{title}</BookTitle>
        <p>{authors.join(', ')}</p>
      </Description>
    </StyledCard>
  );
};
