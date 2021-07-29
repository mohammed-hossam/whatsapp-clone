import styled from 'styled-components';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { auth, db } from '../firebase';
import * as EmailValidator from 'email-validator';
import useContent from '../utils/useContent';
import ChatPeople from './ChatPeople';

function Sidebar() {
  const user = auth.currentUser;
  // console.log(user);
  //deh array 3shan 2geb kol data el chat m3 men(msh el chat nfso) bta3t el user ele heya[user.email, wantedEmail]
  const allUserChatwith = useContent(user).map((el) => el.data);
  // console.log(allUserChatwith);

  function createChat() {
    const wantedEmail = prompt(
      'please enter the email adress for the user you want to chat with'
    );

    if (!wantedEmail) {
      return;
    }

    if (
      EmailValidator.validate(wantedEmail) &&
      wantedEmail !== user.email &&
      !chatAlreadyExists(wantedEmail)
    ) {
      db.collection('chats').add({ users: [user.email, wantedEmail] });
      // console.log(chatAlreadyExists(wantedEmail));
    }
  }

  function chatAlreadyExists(recipientEmail) {
    //hena hgeb kol el mails ele el user chat 3maha 2bl kda 3ndana fl db
    const allChatEmails = allUserChatwith.map((el) => {
      return el[1];
    });
    //hena hashooof lw el email ele d5lo dah 3ndana 2bl kda wala la2 fe data el mails ele gbtha fo2
    const doChatExist = allChatEmails.find((el) => {
      return el === recipientEmail;
    });
    return doChatExist;
  }

  return (
    <MainContainer>
      <Header>
        <UserAvatar
          src={user.photoURL}
          onClick={() => {
            auth.signOut();
          }}
        />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <SearchContainer>
        <SearchIconEdit />
        <Input placeholder="Search in chat"></Input>
      </SearchContainer>
      <TitleButton onClick={createChat}>Start A New Chat</TitleButton>
      {useContent(user)?.map((el) => {
        return <ChatPeople id={el.id} key={el.id} data={el.data} />;
      })}
    </MainContainer>
  );
}

export default Sidebar;

const MainContainer = styled.div`
  flex: 0.35;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3em;
  border-bottom: whitesmoke;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2em;
  margin-top: 0.3em;
`;
const Input = styled.input`
  outline: none;
  font-size: 1.2rem;
  border: 0;
  flex: 1;
`;
const TitleButton = styled.button`
  background: transparent;
  font-size: 1.3rem;
  color: #757575;
  cursor: pointer;
  padding: 0.7em;
  border: 0;
  border-bottom: whitesmoke;

  :hover {
    background-color: #e9eaeb;
  }
`;

const IconsContainer = styled.div``;
const UserAvatar = styled(Avatar)`
  margin: 10px;
`;
const SearchIconEdit = styled(SearchIcon)`
  margin-left: 0.5em;
`;
