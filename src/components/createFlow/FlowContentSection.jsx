import styled from 'styled-components';
import RecreationList from './RecreationList';
import { useFormState } from 'react-hook-form';
import AlertMessage from '../common/AlertMessage';

export default function FlowContentSection({
  flow,
  register,
  control,
  appendRecreation,
  removeRecreation,
}) {
  const handleAddCustomRecreationClick = () => {
    appendRecreation({
      id: null,
      title: '',
      keywords: [],
      playTime: null,
      isCustom: true,
    });
  };

  const {
    errors: { title: titleError },
  } = useFormState({ control });

  return (
    <Container>
      <SectionHeaderContainer>
        <h2>기본정보</h2>
        <h2>세부정보</h2>
      </SectionHeaderContainer>
      <SummaryBox>
        <Column>
          <InfoRow>
            <Label>목적</Label>
            <span>{flow.purposes.map((purpose) => purpose.value).join(' ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>플레이 시간</Label>
            <span>{flow.totalPlayTime}분</span>
          </InfoRow>
        </Column>

        <Line />

        <Column className="right">
          <InfoRow>
            <Label>키워드</Label>
            {flow.keywords.length === 0 && '선택해주세요.'}
            <span>{flow.keywords.map((keyword) => keyword.value).join(' ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>성별</Label>
            {flow.genders.length === 0 && '선택해주세요.'}
            <span>{flow.genders.map((gender) => gender.value).join(', ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>연령대</Label>
            {flow.ageGroups.length === 0 && '선택해주세요.'}
            <span>{flow.ageGroups.map((group) => group.value).join(', ')}</span>
          </InfoRow>
          <InfoRow>
            <Label>인원</Label>
            <span>{flow.participants > 0 ? `${flow.participants}명` : '입력해주세요.'}</span>
          </InfoRow>
        </Column>
      </SummaryBox>
      <SectionHeader>일정플로우 제목</SectionHeader>
      <TitleInputBox>
        <TitleInput
          placeholder="일정플로우의 제목을 입력해주세요."
          {...register('title', {
            required: {
              value: true,
              message: '플로우 제목을 입력해주세요.',
            },
            minLength: {
              value: 2,
              message: '2자 이상 40자 이하로 입력해주세요.',
            },
            maxLength: {
              value: 40,
              message: '2자 이상 40자 이하로 입력해주세요.',
            },
          })}
        />
        {titleError ? (
          <AlertMessage message={titleError.message} />
        ) : (
          <div style={{ height: '1.13rem' }} />
        )}
      </TitleInputBox>

      <RecreationListContainer>
        <h2 className={!flow.title ? 'empty-title' : ''}>
          {flow.title ? flow.title : '플로우 제목'}
        </h2>
        <RecreationList
          recreations={flow.recreations}
          register={register}
          removeRecreation={removeRecreation}
          control={control}
        />
        <AddCustomRecreationButton onClick={handleAddCustomRecreationClick}>
          +
        </AddCustomRecreationButton>
      </RecreationListContainer>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 50%;
`;

const SectionHeaderContainer = styled.div`
  ${({ theme }) => theme.text.h4};
  padding: 1.7rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  border-radius: 1.25rem;
  display: flex;
  align-items: center;

  h2 {
    width: 50%;
    text-align: center;
  }
`;

const SectionHeader = styled.h2`
  ${({ theme }) => theme.text.h4};
  padding: 1.7rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale05};
  border-radius: 1.25rem;
`;

const SummaryBox = styled.div`
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.color.grayscale07};
  padding: 1.8rem 1.25rem;
  display: flex;
  align-items: center;
  height: 6.5rem;
  margin-bottom: 1.25rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 50%;

  &.right {
    margin-left: 1.25rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  gap: 0.5rem;
  ${({ theme }) => theme.text.small};
`;

const Label = styled.h3`
  ${({ theme }) => theme.text.smallBold};
`;

const Line = styled.div`
  border-left: 1px solid #cacdd2;
  height: 100%;
  width: 1px;
`;

const TitleInput = styled.input`
  ${({ theme }) => theme.text.paragraph};
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.color.grayscale07};
  padding: 0.8rem 1.2rem;
  border: none;

  ::placeholder {
    ${({ theme }) => theme.text.paragraph};
    color: ${({ theme }) => theme.color.grayscale04};
  }
`;

const TitleInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 6rem;
`;

const RecreationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  align-items: center;
  margin: 0 1.75rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.color.grayscale04};
  padding: 2rem 4.3rem;

  h2 {
    ${({ theme }) => theme.text.h4};
    text-align: center;
    word-break: break-all;
    line-height: normal;

    &.empty-title {
      color: ${({ theme }) => theme.color.grayscale04};
    }
  }
`;

const AddCustomRecreationButton = styled.button`
  width: 65%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.grayscale07};
  border-radius: 1.25rem;
  box-shadow: 0 0 20px ${({ theme }) => theme.color.grayscale01}26;
  padding: 5px 0;
  font-size: 2.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.main02};
    color: ${({ theme }) => theme.color.main05};
  }

  transition:
    background-color 0.3s,
    color 0.3s;
`;
