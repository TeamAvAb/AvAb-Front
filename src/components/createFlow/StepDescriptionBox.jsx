import styled from 'styled-components';

export default function StepDescriptionBox({ children }) {
  return <Box>{children}</Box>;
}

const Box = styled.span`
  ${({ theme }) => theme.text.small};
  background-color: ${({ theme }) => theme.color.main01};
  color: ${({ theme }) => theme.color.main05};
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  border-radius: 9999px;
  line-height: normal;
  margin-bottom: 6.25rem;

  strong {
    font-weight: 700;
  }
`;
