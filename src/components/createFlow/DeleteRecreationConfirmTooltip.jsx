import alertIcon from '../../assets/main/alert.svg';
import Button from '../common/button/Button';
import React from 'react';
import styled from 'styled-components';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export default function DeleteRecreationConfirmTooltip({ tooltipId, isOpen, onDelete, onCancel }) {
  return (
    <Tooltip id={tooltipId} isOpen={isOpen} offset={5} opacity={1}>
      <TooltipContent>
        <TooltipMessage>
          <img src={alertIcon} alt="경고" />
          <span>
            삭제하시겠습니까?
            <br />
            작업을 되돌릴 수 없습니다.
          </span>
        </TooltipMessage>
        <TooltipButtonContainer>
          <Button onClick={onDelete} size="xs" color="grayscale01" backgroundColor="main04">
            삭제
          </Button>
          <Button onClick={onCancel} size="xs" backgroundColor="main05">
            취소
          </Button>
        </TooltipButtonContainer>
      </TooltipContent>
    </Tooltip>
  );
}

const Tooltip = styled(ReactTooltip)`
  background: ${({ theme }) => theme.color.grayscale03} !important;
  padding: 1.2rem !important;
  border-radius: 1.2rem !important;
`;

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TooltipMessage = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.color.main04};
  ${({ theme }) => theme.text.paragraph};
  text-align: center;
  line-height: normal;
`;

const TooltipButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  pointer-events: auto;
`;
