export default function CreateFlowBasicInfo({ onNext }) {
  return (
    <div>
      기본정보
      <button onClick={() => onNext(['A', 'B', 'C'], 10)}>다음으로</button>
    </div>
  );
}
