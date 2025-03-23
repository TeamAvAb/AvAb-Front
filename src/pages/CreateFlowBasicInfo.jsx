import styled from 'styled-components';
import keywordImg from '../assets/main/checkIcon.svg';
import StepControl from '../components/createFlow/StepControl';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import KeywordModal from '../components/main/KeywordModal';
import KEYWORD_CATEGORY from '../constants/searchKeywordCategory';
import deleteImg from '../assets/main/deleteIcon.svg';
import PURPOSE from '../constants/enum/purpose';
import AlertMessage from '../components/common/AlertMessage';
import { useNavigate } from 'react-router-dom';
import SITE_URL from '../constants/url';

export default function CreateFlowBasicInfo({ onNext, context, validateRef, saveContext }) {
  const [isPurposeModalOpen, setIsPurposeModalOpen] = useState(false);

  const { purposes, totalPlayTime } = context;
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { purposes, totalPlayTime },
  });

  const navigate = useNavigate();

  useEffect(() => {
    validateRef.current = (onValid) => handleSubmit(onValid);
  }, [handleSubmit, validateRef]);

  useEffect(() => {
    const { unsubscribe } = watch((value) => saveContext(value));

    return () => unsubscribe();
  }, [watch, saveContext]);

  const handlePurposeBoxClick = () => {
    setIsPurposeModalOpen(true);
  };

  const handleRemovePurposeClick = (target) => {
    const selected = getValues('purposes');

    setValue(
      'purposes',
      selected.filter((purpose) => purpose.key !== target.key),
    );
  };

  const handleNextClick = () => {
    handleSubmit((data) => {
      onNext(data.purposes, data.totalPlayTime);
    })();
  };

  const handleBackClick = () => {
    navigate(SITE_URL.FLOW, { replace: true });
  };

  const renderSelectedPurposes = () => {
    return watch('purposes').map((purpose) => (
      <SelectedKeyword key={purpose.key}>
        <span>{purpose.value} 포함</span>
        <img
          alt={`${purpose.value} 삭제`}
          src={deleteImg}
          id={purpose}
          style={{ width: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemovePurposeClick(purpose);
          }}
        />
      </SelectedKeyword>
    ));
  };

  return (
    <Container>
      <Form>
        <FormItem>
          <Label>레크레이션의 목적을 선택해주세요.</Label>
          <KeywordBox id="purpose" onClick={handlePurposeBoxClick}>
            <img src={keywordImg} style={{ width: '20px', height: '20px' }} alt="" />
            {watch('purposes').length === 0 ? (
              '클릭하면 목적 선택창이 나와요!'
            ) : (
              <SelectedKeywords>{renderSelectedPurposes()}</SelectedKeywords>
            )}
          </KeywordBox>
          <ErrorWrapper>
            {errors.purposes && <AlertMessage message={errors.purposes.message} />}
          </ErrorWrapper>
        </FormItem>
        <FormItem>
          <Label>레크레이션의 총 진행 시간을 입력해주세요.</Label>
          <FormRow>
            <Input
              placeholder="시간을 10분 단위로 입력해주세요."
              type="number"
              min={10}
              max={300}
              step={10}
              {...register('totalPlayTime', {
                required: { value: true, message: '플레이 시간을 입력해주세요.' },
                min: { value: 10, message: '플레이 시간은 10분에서 300분 사이로 입력해주세요.' },
                max: { value: 300, message: '플레이 시간은 10분에서 300분 사이로 입력해주세요.' },
                validate: {
                  totalPlayTime: (value) =>
                    value % 10 === 0 || '플레이 시간은 10분 단위로 입력해주세요.',
                },
                valueAsNumber: true,
              })}
            />
            {errors.totalPlayTime && <AlertMessage message={errors.totalPlayTime.message} />}
          </FormRow>
        </FormItem>
      </Form>
      <StepControl first onNext={handleNextClick} onBack={handleBackClick} />

      <Controller
        name="purposes"
        control={control}
        rules={{
          validate: (value) => value.length > 0 || '목적을 하나 이상 선택해주세요.',
        }}
        render={({ field: { onChange, value } }) =>
          isPurposeModalOpen && (
            <KeywordModal
              category={KEYWORD_CATEGORY.PURPOSE}
              content={Object.values(PURPOSE)}
              modalControl={setIsPurposeModalOpen}
              keywordControl={onChange}
              selectedOption={value}
              min={1}
            />
          )
        }
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.5rem;
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

const Input = styled.input`
  padding: 1rem 0.8rem;
  width: 15rem;
  border-radius: 1.25rem;
  border: 1px solid
    ${({ theme, $error }) => ($error ? theme.color.main04 : theme.color.grayscale04)};
  ${({ theme }) => theme.text.small};

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale04};
    ${({ theme }) => theme.text.small};
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const ErrorWrapper = styled.div`
  margin-top: -0.5rem;
  padding-left: 0.5rem;
`;
