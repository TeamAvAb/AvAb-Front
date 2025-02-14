export function CreateFlowFlowContents({ context, onBack }) {
  console.log('상세 정보/추천 플로우에서 넘어온 데이터', context);

  return (
    <div>
      플로우 내용
      <button onClick={onBack}>이전</button>
      <button>저장하기</button>
    </div>
  );
}
