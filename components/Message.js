import styled from 'styled-components';
import { auth } from '../firebase';
import moment from 'moment';

function Message({ message, user }) {
  const curentuser = auth.currentUser;
  const Msg = user === curentuser.email ? Sender : Reciever;

  return (
    <MainContainer>
      <Msg>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </Timestamp>
      </Msg>
    </MainContainer>
  );
}

export default Message;

const MainContainer = styled.div``;
const Mainmessage = styled.p`
  width: fit-content;
  text-align: right;
  padding: 0.85em;
  margin: 10px;
  position: relative;
  border-radius: 8px;
  font-size: 1.1rem;
`;
const Sender = styled(Mainmessage)`
  margin-left: auto;
  background-color: #dcf8c6;
`;
const Reciever = styled(Mainmessage)`
  background-color: whitesmoke;
  text-align: left;
`;
const Timestamp = styled.span`
  color: gray;
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.3em;
  font-size: 0.6rem;
`;
