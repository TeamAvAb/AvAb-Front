import styled from 'styled-components';

export default function Button({
  children,
  onClick,
  backgroundColor,
  color,
  border,
  size = 'md',
  className,
}) {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      color={color}
      border={border}
      onClick={onClick}
      size={size}
      className={className}
    >
      {children}
    </StyledButton>
  );
}

const buttonPadding = {
  sm: '0.5rem 1.5rem',
  md: '1rem 2rem',
};

const StyledButton = styled.button`
  background-color: ${({ backgroundColor, theme }) => theme.color[backgroundColor]};
  border-radius: 9999px;
  color: ${({ color, theme }) => theme.color[color]};
  padding: ${({ size }) => buttonPadding[size]};
  font-size: ${({ theme }) => theme.text.button.fontSize};
  font-weight: ${({ theme }) => theme.text.button.fontWeight};
  border: ${({ border, theme }) => (border ? `1px solid ${theme.color.grayscale01}` : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
`;
