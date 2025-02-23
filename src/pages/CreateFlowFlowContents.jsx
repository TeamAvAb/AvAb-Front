import styled from 'styled-components';
import SelectRecreationSection from '../components/createFlow/SelectRecreationSection';
import { FlowContentsSection } from '../components/createFlow/FlowContentsSection';
import StepControl from '../components/createFlow/StepControl';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { privateAPI } from '../apis/user';
import KEYWORD from '../constants/enum/keyword';
import useModal from '../hooks/useModal';
import CreateFlowBeforeUnloadModal from '../components/modal/CreateFlowBeforeUnloadModal';
import FlowContentsErrorModal from '../components/modal/FlowContentsErrorModal';

export default function CreateFlowFlowContents({ context, onBack, saveContext }) {
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

  const [contentsError, setContentsError] = useState('');

  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: {
      title: contextTitle,
      recreations: !!contextRecreations.length
        ? contextRecreations
        : [
            {
              id: null,
              title: '',
              keywords: [],
              playTime: null,
              isCustom: true,
            },
          ],
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

  const {
    ModalWrapper: BeforeUnloadModalWrapper,
    openModal: openBeforeUnloadModal,
    closeModal: closeBeforeUnloadModal,
  } = useModal();

  const {
    ModalWrapper: ContentsErrorModalWrapper,
    openModal: openContentsErrorModal,
    closeModal: closeContentsErrorModal,
  } = useModal();

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

  const saveFlow = ({
    title,
    recreations,
    totalPlayTime,
    participants,
    ageGroups,
    purposes,
    keywords,
    genders,
  }) => {
    const recreationSpecList = recreations.map((recreation, seq) =>
      !recreation.isCustom
        ? {
            seq,
            recreationId: recreation.id,
            customPlayTime: recreation.playTime,
          }
        : {
            seq,
            customTitle: recreation.title,
            customPlayTime: recreation.playTime,
            customKeywordList: recreation.keywords.map((keyword) => keyword.key),
          },
    );
    const ageList = ageGroups.map((ageGroup) => ageGroup.key);
    const purposeList = purposes.map((purpose) => purpose.key);
    const keywordList = keywords.map((keyword) => keyword.key);
    const genderList = genders.map((gender) => gender.key);

    const flow = {
      title,
      recreationSpecList,
      totalPlayTime,
      participants,
      ageList,
      purposeList,
      keywordList,
      genderList,
    };

    console.log(flow);
    // TODO: API 호출
  };

  const handleInvalidContents = (errors) => {
    if (errors.recreations.some((recreation) => !!recreation.keywords)) {
      setContentsError('recreationsKeyword');
      openContentsErrorModal();
    }
  };

  const handleSaveClick = () => {
    handleSubmit((data) => saveFlow({ ...context, ...data }), handleInvalidContents)();
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
      <StepControl last onBack={handleBackClick} onNext={handleSaveClick} />
      <BeforeUnloadModalWrapper>
        <CreateFlowBeforeUnloadModal close={closeBeforeUnloadModal} />
      </BeforeUnloadModalWrapper>
      <ContentsErrorModalWrapper>
        <FlowContentsErrorModal close={closeContentsErrorModal} variant={contentsError} />
      </ContentsErrorModalWrapper>
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
