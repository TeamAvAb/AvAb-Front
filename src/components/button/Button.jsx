import styled from 'styled-components';

export default function Button({
  children,
  onClick,
  backgroundColor,
  color,
  border,
  size = 'medium',
}) {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      color={color}
      border={border}
      onClick={onClick}
      size={size}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: ${({ backgroundColor, theme }) => theme.color[backgroundColor]};
  border-radius: 9999px;
  color: ${({ color, theme }) => theme.color[color]};
  padding: ${({ size }) => (size === 'small' ? '0.5rem 1.5rem' : '1rem 2rem')};
  font-size: ${({ theme }) => theme.text.button.fontSize};
  font-weight: ${({ theme }) => theme.text.button.fontWeight};
  border: ${({ border }) => (border ? '1px solid black' : 'none')};
`;
