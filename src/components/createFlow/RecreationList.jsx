import styled from 'styled-components';
import React from 'react';
import CustomRecreationItem from './CustomRecreationItem';
import RecreationItem from './RecreationItem';

export default function RecreationList({ recreations, register, removeRecreation, control }) {
  return (
    <ListContainer>
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
            playTime={field.playTime}
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
`;
