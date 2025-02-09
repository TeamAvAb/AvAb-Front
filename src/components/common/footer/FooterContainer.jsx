import styled from 'styled-components';

export default function FooterContainer({ children }) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.color.grayscale06};
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  min-height: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 67.5rem;
`;
