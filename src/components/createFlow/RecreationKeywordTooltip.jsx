import { Tooltip as ReactTooltip } from 'react-tooltip';
import styled from 'styled-components';

export default function RecreationKeywordTooltip({ tooltipId }) {
  return (
    <Tooltip id={tooltipId} opacity={1} offset={5} place="bottom">
      클릭하면 수정할 수 있어요.
    </Tooltip>
  );
}

const Tooltip = styled(ReactTooltip)`
  background: ${({ theme }) => theme.color.secondary04} !important;
  padding: 1.2rem !important;
  border-radius: 1.2rem !important;
  ${({ theme }) => theme.text.smallBold};
  color: ${({ theme }) => theme.color.grayscale01} !important;
  box-shadow: 0 0 20px ${({ theme }) => theme.color.grayscale01}26;
`;
