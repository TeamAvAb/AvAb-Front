export default function CreateFlowDetailInfo({ context, onBack, onNext }) {
  console.log('기본 정보에서 넘어온 데이터', context);

  return (
    <div>
      세부정보
      <button onClick={onBack}>이전</button>
      <button
        onClick={() =>
          onNext('recommended-flows', ['A', 'B', 'C'], ['MALE', 'FEMALE'], [10, 20, 30], 30)
        }
      >
        추천 플로우
      </button>
      <button
        onClick={() =>
          onNext('flow-contents', ['A', 'B', 'C'], ['MALE', 'FEMALE'], [10, 20, 30], 30)
        }
      >
        플로우 내용
      </button>
    </div>
  );
}
