import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExpandLogo from 'src/assets/icons/expand.svg?react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  align-items: center;
`;

const Label = styled.span`
  white-space: nowrap;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  background: #fff;
  max-width: 12rem;
  cursor: pointer;
`;

const SelectedField = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  justify-content: space-between;
  & svg {
    height: 100%;
    width: auto;
    margin-left: auto;
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 2rem;
  z-index: 1;
  width: 100%;
  border-radius: 0.5rem;
  background: #fff;
  margin: 0.25rem 0;
  padding: 0;
  overflow: hidden;
  box-shadow: 0.15rem 0.15rem 0.5rem ${({ theme }) => theme.colors.bgLight};
`;

const OptionItem = styled.li`
  list-style: none;
  padding: 0.5rem;
  &:hover {
    background: ${({ theme }) => theme.colors.bgLight};
  }
`;

type Props<T> = {
  label: string;
  options: readonly T[];
  defaultValue?: T;
  onSelect: (value: string) => void;
};

export const CustomSelect = <T extends string>({
  label,
  options,
  defaultValue,
  onSelect,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (item: T) => {
    setSelectedValue(item);
    onSelect(item);
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('click', handleClose);

    return () => document.removeEventListener('click', handleClose);
  }, [isOpen]);

  return (
    <Wrapper>
      <Label>{label}</Label>
      <SelectContainer>
        <SelectedField
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          {selectedValue}
          <ExpandLogo />
        </SelectedField>
        {isOpen && (
          <OptionsList>
            {options.map((item) => (
              <OptionItem key={item} onClick={() => handleSelect(item as T)}>
                {item}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </SelectContainer>
    </Wrapper>
  );
};
