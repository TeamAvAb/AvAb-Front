import styled from 'styled-components';

export default function Button({ children, onClick, backgroundColor, color, border }) {
  return (
    <StyledButton backgroundColor={backgroundColor} color={color} border={border} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: ${({ backgroundColor, theme }) => theme.color[backgroundColor]};
  border-radius: 9999px;
  color: ${({ color, theme }) => theme.color[color]};
  padding: 1rem 2rem;
  font-size: ${({ theme }) => theme.text.button.fontSize};
  font-weight: ${({ theme }) => theme.text.button.fontWeight};
  border: ${({ border }) => (border ? '1px solid black' : 'none')};
`;
