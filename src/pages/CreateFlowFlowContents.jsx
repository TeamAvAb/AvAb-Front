import styled from 'styled-components';
import SelectRecreationSection from '../components/createFlow/SelectRecreationSection';
import { FlowContentsSection } from '../components/createFlow/FlowContentsSection';
import StepControl from '../components/createFlow/StepControl';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { privateAPI } from '../apis/user';
import KEYWORD from '../constants/enum/keyword';

export function CreateFlowFlowContents({ context, onBack, saveContext }) {
  const {
    purposes,
    totalPlayTime,
    keywords,
    genders,
    ageGroups,
    participants,
    recommendedFlowId,
    recreations: contextRecreations,
    title: contextTitle,
  } = context;

  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: {
      title: contextTitle,
      recreations: contextRecreations,
    },
  });

  const {
    fields: recreations,
    append: appendRecreation,
    remove: removeRecreation,
    replace: replaceAllRecreations,
  } = useFieldArray({
    control,
    name: 'recreations',
  });

  useEffect(() => {
    const fetchRecommendedFlow = async () => {
      if (!recommendedFlowId) {
        return;
      }

      try {
        const response = await privateAPI.get(`/api/flows/${recommendedFlowId}`);
        if (response.data.result) {
          replaceAllRecreations(
            response.data.result.recreations.map((recreation) => ({
              id: recreation.id,
              title: recreation.title,
              keywords: recreation.keywordList.map((keyword) => KEYWORD[keyword]),
              playTime: recreation.playTime,
              isCustom: false,
            })),
          );
        }
      } catch (e) {
        console.error('추천 플로우 조회 실패', e);
      }
    };

    if (!contextRecreations.length) {
      fetchRecommendedFlow();
    }
  }, []);

  useEffect(() => {
    const { unsubscribe } = watch((data) => saveContext(data));

    return () => unsubscribe();
  }, [watch]);

  const handleBackClick = () => {
    handleSubmit((data) => onBack(data.title, data.recreations))();
  };

  return (
    <Container>
      <Sections>
        <SelectRecreationSection
          totalPlayTime={totalPlayTime}
          purposes={purposes}
          appendRecreation={appendRecreation}
        />
        <FlowContentsSection
          flow={{
            title: watch('title'),
            purposes,
            totalPlayTime,
            keywords,
            genders,
            ageGroups,
            participants,
            recreations,
          }}
          register={register}
          control={control}
          appendRecreation={appendRecreation}
          removeRecreation={removeRecreation}
        />
      </Sections>
      <StepControl last onBack={handleBackClick} />
    </Container>
  );
}

const Sections = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
`;
