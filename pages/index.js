import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

function chat() {
  return (
    <MainContainer>
      <Sidebar />
    </MainContainer>
  );
}

export default chat;

const MainContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
`;
