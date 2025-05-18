import styled from 'styled-components';
import React from 'react';
import CustomRecreationItem from './CustomRecreationItem';
import RecreationItem from './RecreationItem';

export default function RecreationList({ recreations, register, removeRecreation, control }) {
  return (
    <ListContainer>
      {recreations.length === 0 && <NoRecreationText>레크레이션을 추가해주세요.</NoRecreationText>}
      {recreations.map((field, index) =>
        field.isCustom ? (
          <CustomRecreationItem
            key={field.id}
            index={index}
            register={register}
            removeRecreation={removeRecreation}
            control={control}
          />
        ) : (
          <RecreationItem
            key={field.id}
            index={index}
            removeRecreation={removeRecreation}
            recreationTitle={field.title}
            keywords={field.keywords}
            register={register}
            control={control}
          />
        ),
      )}
    </ListContainer>
  );
}

const ListContainer = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 24rem;
  max-height: 120rem;
`;

const NoRecreationText = styled.span`
  ${({ theme }) => theme.text.h4};
  color: ${({ theme }) => theme.color.grayscale04};
  text-align: center;
  padding: 2rem 0;
`;
