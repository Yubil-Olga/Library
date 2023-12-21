import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
  authors: string[];
  category: string;
  imageUrl: string;
};

const StyledCard = styled.div`
  border-radius: 0.5rem;
  background-color: lightgray;
  padding: 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

export const Card: FC<Props> = ({ title, authors, category, imageUrl }) => {
  return (
    <StyledCard>
      <StyledImage alt={title} src={imageUrl} />
      <p>{title}</p>
      <p>{authors.join(', ')}</p>
      <p>{category}</p>
    </StyledCard>
  );
};
