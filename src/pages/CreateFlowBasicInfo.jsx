import PURPOSE from '../constants/enum/purpose';

export default function CreateFlowBasicInfo({ onNext }) {
  return (
    <div>
      기본정보
      <button onClick={() => onNext([PURPOSE.MT, PURPOSE.RETREAT], 100)}>다음으로</button>
    </div>
  );
}
