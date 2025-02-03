import styled from 'styled-components';
import SideNav from './SideNav';

export default function Page({ children, selectedPage }) {
  return (
    <Container>
      <SideNav selectedPage={selectedPage} />
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 11rem);
  padding-right: 5%;
  background-color: ${({ theme }) => theme.color.grayscale07};
`;

const Content = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.main05};
  flex: 1;
  justify-content: center;
  align-items: center;
  border-right: solid ${({ theme }) => theme.color.grayscale05} 1px;
`;
