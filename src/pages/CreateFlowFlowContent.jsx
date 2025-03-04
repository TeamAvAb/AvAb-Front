import styled from 'styled-components';
import SelectRecreationSection from '../components/createFlow/SelectRecreationSection';
import StepControl from '../components/createFlow/StepControl';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { privateAPI } from '../apis/user';
import KEYWORD from '../constants/enum/keyword';
import useModal from '../hooks/useModal';
import FlowContentErrorModal from '../components/modal/FlowContentErrorModal';
import FlowContentSection from '../components/createFlow/FlowContentSection';
import { useNavigate } from 'react-router-dom';
import SITE_URL from '../constants/url';

export default function CreateFlowFlowContent({
  context,
  onBack,
  saveContext,
  validateRef,
  onFlowSaved,
}) {
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

  const {
    register,
    control,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
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
    rules: {
      validate: {
        playTimeLt: (value) =>
          value.reduce((acc, recreation) => acc + recreation.playTime, 0) >= totalPlayTime,
        playTimeGt: (value) =>
          value.reduce((acc, recreation) => acc + recreation.playTime, 0) <= totalPlayTime,
      },
    },
  });

  const navigate = useNavigate();

  const {
    ModalWrapper: ContentErrorModalWrapper,
    openModal: openContentErrorModal,
    closeModal: closeContentErrorModal,
  } = useModal();

  useEffect(() => {
    validateRef.current = (onValid) => onValid;
  }, [validateRef]);

  useEffect(() => {
    const { unsubscribe } = watch((data) => saveContext(data));

    return () => unsubscribe();
  }, [watch, saveContext]);

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
  }, [contextRecreations.length, recommendedFlowId, replaceAllRecreations]);

  const handleBackClick = () => {
    const data = getValues();
    onBack(data.title, data.recreations);
  };

  const convertFlowToDTO = ({
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

    return {
      title,
      recreationSpecList,
      totalPlayTime,
      participants,
      ageList,
      purposeList,
      keywordList,
      genderList,
    };
  };

  const saveFlow = async (data) => {
    const req = convertFlowToDTO(data);

    console.log(req);

    try {
      const res = await privateAPI.post('/api/flows', req);

      if (res.status === 201) {
        console.log('플로우 저장 성공');
        return res.data.result.flowId;
      }

      return null;
    } catch (error) {
      console.error('플로우 저장 실패', error);
    }
  };

  const navigateToFlowDetail = (flowId) => {
    navigate(SITE_URL.FLOW_DETAIL(flowId), { replace: true });
  };

  const handleValidData = async (data) => {
    const flowId = await saveFlow({ ...context, ...data });

    if (flowId) {
      onFlowSaved();
      navigateToFlowDetail(flowId);
    }
  };

  const handleInvalidData = (errors) => {
    if (
      errors?.recreations?.root?.type === 'playTimeLt' ||
      errors?.recreations?.root?.type === 'playTimeGt'
    ) {
      openContentErrorModal();
    }
  };

  const handleSaveClick = () => {
    handleSubmit(handleValidData, handleInvalidData)();
  };

  return (
    <Container>
      <Sections>
        <SelectRecreationSection
          totalPlayTime={totalPlayTime}
          purposes={purposes}
          appendRecreation={appendRecreation}
        />
        <FlowContentSection
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

      <ContentErrorModalWrapper>
        <FlowContentErrorModal
          close={closeContentErrorModal}
          variant={errors?.recreations?.root?.type}
        />
      </ContentErrorModalWrapper>
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
