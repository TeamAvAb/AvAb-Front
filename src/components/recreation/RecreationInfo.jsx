import React from 'react';
import styled from 'styled-components';

export default function RecreationInfo({ title, children }) {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayscale05};

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  ${({ theme }) => theme.text.h4};
`;
