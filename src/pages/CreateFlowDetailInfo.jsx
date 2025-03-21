import styled from 'styled-components';
import { useEffect, useState } from 'react';
import checkIcon from '../assets/common/checkIcon.svg';
import deleteImg from '../assets/common/deleteIcon.svg';
import RadioInput from '../components/main/RadioInput';
import GENDER from '../constants/enum/gender';
import AGE from '../constants/enum/age';
import imgGo3 from '../assets/flowwrite/ImgGo3.png';
import double_arrow from '../assets/flowwrite/double_right_arrow.svg';
import imgGo4 from '../assets/flowwrite/ImgGo4.png';
import KeywordModal from '../components/main/KeywordModal';
import KEYWORD_CATEGORY from '../constants/searchKeywordCategory';
import KEYWORD from '../constants/enum/keyword';
import { Controller, useForm } from 'react-hook-form';
import AlertMessage from '../components/common/AlertMessage';
import StepControl from '../components/createFlow/StepControl';
import StepDescriptionBox from '../components/createFlow/StepDescriptionBox';

export default function CreateFlowDetailInfo({
  context,
  onBack,
  onNext,
  validateRef,
  saveContext,
}) {
  const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);

  const { keywords, genders, ageGroups, participants } = context;
  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { keywords, genders, ageGroups, participants },
  });

  useEffect(() => {
    validateRef.current = (onValid) => handleSubmit(onValid);
  }, [handleSubmit, validateRef]);

  useEffect(() => {
    const { unsubscribe } = watch((value) => saveContext(value));

    return () => unsubscribe();
  }, [watch, saveContext]);

  const handleKeywordBoxClick = () => {
    setIsKeywordModalOpen(true);
  };

  const handleRemoveKeywordClick = (target) => {
    const selected = getValues('keywords');

    setValue(
      'keywords',
      selected.filter((keyword) => keyword.key !== target.key),
    );
  };

  const handleRecommendedFlowsClick = () => {
    handleSubmit((data) =>
      onNext('recommended-flows', data.keywords, data.genders, data.ageGroups, data.participants),
    )();
  };

  const handleFlowContentsClick = () => {
    handleSubmit((data) =>
      onNext('flow-contents', data.keywords, data.genders, data.ageGroups, data.participants),
    )();
  };

  const handleBackClick = () => {
    handleSubmit((data) =>
      onBack(data.keywords, data.genders, data.ageGroups, data.participants),
    )();
  };

  const handleNextClick = () => {
    handleSubmit((data) =>
      onNext('recommended-flows', data.keywords, data.genders, data.ageGroups, data.participants),
    )();
  };

  const renderSelectedKeywords = () => {
    return watch('keywords').map((keyword) => (
      <SelectedKeyword key={keyword.key}>
        <span>{keyword.value} 포함</span>
        <img
          alt={`${keyword.value} 삭제`}
          src={deleteImg}
          id={keyword}
          style={{ width: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveKeywordClick(keyword);
          }}
        />
      </SelectedKeyword>
    ));
  };

  return (
    <Container>
      <StepDescriptionBox>
        세부정보 입력은 필수사항은 아니지만, <strong>세부정보</strong>를 입력할수록{' '}
        <strong>정확한 추천</strong>을 얻을 수 있습니다.
      </StepDescriptionBox>
      <Form>
        <FormItem>
          <Label>원하는 키워드를 선택해주세요.</Label>
          <KeywordBox id="keyword" onClick={handleKeywordBoxClick}>
            <img src={checkIcon} style={{ width: '20px', height: '20px' }} alt="" />
            {watch('keywords').length === 0 ? (
              '클릭하면 키워드 선택창이 나와요!'
            ) : (
              <SelectedKeywords>{renderSelectedKeywords()}</SelectedKeywords>
            )}
          </KeywordBox>
        </FormItem>
        <FormItem>
          <Label>레크레이션에 참여하는 인원의 성별과 연령대를 선택해주세요.</Label>
          <RadioInputContainer>
            <RadioInputLabel>성별</RadioInputLabel>
            <Controller
              control={control}
              name="genders"
              render={({ field: { onChange, value } }) => (
                <RadioInput
                  options={Object.values(GENDER)}
                  setOption={onChange}
                  selectedOption={value}
                  border
                  gap="sm"
                />
              )}
            />
          </RadioInputContainer>
          <RadioInputContainer>
            <RadioInputLabel>연령대</RadioInputLabel>
            <Controller
              control={control}
              name="ageGroups"
              render={({ field: { onChange, value } }) => (
                <RadioInput
                  options={Object.values(AGE)}
                  setOption={onChange}
                  selectedOption={value}
                  border
                  gap="sm"
                />
              )}
            />
          </RadioInputContainer>
        </FormItem>
        <FormItem>
          <Label>레크레이션에 참여하는 조별 인원을 입력해주세요.</Label>
          <FormRow>
            <ParticipantInput
              $error={!!errors.participants}
              {...register('participants', {
                min: { value: 1, message: '조별 인원은 1명에 100명 사이로 입력해주세요.' },
                max: { value: 100, message: '조별 인원은 1명에 100명 사이로 입력해주세요.' },
                valueAsNumber: true,
              })}
              placeholder="조별 인원을 입력해주세요."
              type="number"
              min={1}
              max={100}
            />
            {errors.participants && <AlertMessage message={errors.participants.message} />}
          </FormRow>
        </FormItem>
      </Form>
      <ButtonCardContainer>
        <ButtonCard onClick={handleRecommendedFlowsClick}>
          <img src={imgGo3} alt="go 3" style={{ width: '120px', height: '120px' }} />
          <CardText>
            <TitleText>추천 플로우 확인하기</TitleText>
            <SubText>
              입력한 정보를 바탕으로
              <br />
              아브아브가 추천한 플로우예요!
            </SubText>
          </CardText>
          <ArrowIcon src={double_arrow} alt="arrow" />
        </ButtonCard>
        <ButtonCard className="reversed" onClick={handleFlowContentsClick}>
          <ArrowIcon className="reversed" src={double_arrow} alt="arrow" />
          <CardText className="reversed">
            <TitleText>바로 플로우 작성하기</TitleText>
            <SubText>
              원하는 플로우를 작성할 수 있도록
              <br />
              아브아브가 도와줄게요!
            </SubText>
          </CardText>
          <img src={imgGo4} alt="go 4" style={{ width: '120px', height: '120px' }} />
        </ButtonCard>
      </ButtonCardContainer>
      <StepControl onBack={handleBackClick} onNext={handleNextClick} />
      <Controller
        render={({ field: { onChange, value } }) =>
          isKeywordModalOpen && (
            <KeywordModal
              category={KEYWORD_CATEGORY.KEYWORD}
              content={Object.values(KEYWORD)}
              modalControl={setIsKeywordModalOpen}
              keywordControl={onChange}
              selectedOption={value}
              min={1}
              max={10}
            />
          )
        }
        name="keywords"
        control={control}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Label = styled.label`
  ${({ theme }) => theme.text.h4};
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const KeywordBox = styled.div`
  height: 3rem;
  border-radius: 1.25rem;
  color: ${({ theme }) => theme.color.grayscale04};
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.grayscale04};
  width: 70%;
  padding: 0 0.8rem;
`;

const SelectedKeyword = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 0.8rem;
  gap: 0.8rem;
  border-radius: 9999px;
  background: #d9d9d9; // 디자인 시스템에 없는 색상
  color: ${({ theme }) => theme.color.grayscale01};
`;

const SelectedKeywords = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RadioInputLabel = styled.label`
  ${({ theme }) => theme.text.h5};
  width: 4rem;
`;

const RadioInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const ParticipantInput = styled.input`
  padding: 1rem 0.8rem;
  width: 15%;
  border-radius: 1.25rem;
  border: 1px solid
    ${({ theme, $error }) => ($error ? theme.color.main04 : theme.color.grayscale04)};
  ${({ theme }) => theme.text.small};

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
    ${({ theme }) => theme.text.small};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.reversed {
    transform: translateY(-50%) scaleX(-1);
    left: 1.25rem;
  }
`;

const ButtonCard = styled.button`
  display: flex;
  padding: 2.5rem 1.5rem;
  border-radius: 1.25rem;
  border: none;
  background: ${({ theme }) => theme.color.main03};
  justify-content: center;
  align-items: center;
  transition:
    box-shadow 0.3s ease,
    flex-grow 0.3s ease;
  position: relative;
  flex: 1;
  gap: 2rem;

  &:hover {
    box-shadow: 0 0 20px 0 ${({ theme }) => theme.color.grayscale01}26;
    flex-grow: 1.5;
  }

  &:hover ${ArrowIcon} {
    opacity: 1;
  }

  &.reversed {
    background-color: ${({ theme }) => theme.color.main04};
  }
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
  ${({ theme }) => theme.text.small};
  line-height: normal;

  &.reversed {
    text-align: right;
  }
`;

const TitleText = styled.span`
  ${({ theme }) => theme.text.button};
`;

const SubText = styled.span`
  ${({ theme }) => theme.text.small};
  line-height: normal;
`;

const ButtonCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 7.5rem;
  margin-top: 2.5rem;
`;
