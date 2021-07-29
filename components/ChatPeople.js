import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import useReciever from '../utils/useReciever';

function ChatPeople({ id, data }) {
  const curentuser = auth.currentUser;
  const router = useRouter();

  function enterChat() {
    // console.log(id);
    router.push(`/chat/${id}`);
  }

  const wantedUser = useReciever(data);
  // console.log(wantedUser);

  return (
    <PeopleContainer onClick={enterChat}>
      <UserAvatar src={wantedUser ? wantedUser.photoURL : null} />
      <UserMail>{curentuser.email === data[1] ? data[0] : data[1]}</UserMail>
    </PeopleContainer>
  );
}

export default ChatPeople;

const PeopleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.4em;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 0.4em;
  margin-right: 1em;
`;

const UserMail = styled.p``;
