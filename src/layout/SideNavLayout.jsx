import styled from 'styled-components';
import MyPageSideNav from '../components/myPage/MyPageSideNav';
import FlowTabSideNav from '../components/flow/FlowTabSideNav';

export default function SideNavLayout({ children, selectedPage, parentTab }) {
  return (
    <Container>
      {parentTab === 'my-page' && <MyPageSideNav selectedPage={selectedPage} />}
      {parentTab === 'flow' && <FlowTabSideNav selectedPage={selectedPage} />}
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
