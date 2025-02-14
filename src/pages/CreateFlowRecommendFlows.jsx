export default function CreateFlowRecommendFlows({ context, onBack, onNext }) {
  console.log('상세 정보에서 넘어온 데이터', context);

  return (
    <div>
      추천 플로우
      <button onClick={onBack}>이전</button>
      <button onClick={() => onNext('flow-contents', [1, 2])}>다음</button>
    </div>
  );
}
