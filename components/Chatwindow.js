import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Avatar, IconButton } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import Message from './Message';
import useReciever from '../utils/useReciever';

function Chatwindow({ chat, serverRenderedData }) {
  // console.log(chat);
  const router = useRouter();
  const [msgInput, setMsgInput] = useState('');
  const user = auth.currentUser;
  const [bodyMsgs, setBodyMsgs] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  const endmsgRef = useRef(null);

  if (firstLoad) {
    // console.log('welcoooooooome');
    setFirstLoad(false);
    setBodyMsgs(serverRenderedData);
  }

  useEffect(() => {
    // setFirstLoad(!firstLoad);
    // console.log('welcomeomeomeome');
    db.collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((querySnapshot) => {
        const msgat = querySnapshot.docs.map((doc) => {
          return (
            <Message
              key={doc.id}
              user={doc.data().user}
              message={{
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().getTime(),
              }}
            />
          );
        });
        setBodyMsgs(msgat);
      });
  }, [router.query.id]);

  function scrollToTbottom() {
    endmsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function sendMsg(e) {
    e.preventDefault();
    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: msgInput,
      user: user.email,
      photoURL: user.photoURL,
    });
    setMsgInput('');
    scrollToTbottom();
  }
  const reciever = useReciever(chat?.users);
  // console.log(reciever.lastSeen);
  // console.log(reciever);

  return (
    <MainContainer>
      <Header>
        <Avatar src={reciever ? reciever.photoURL : null} />
        <HeaderInformation>
          <h3>
            {user.email === chat.users[0] ? chat.users[1] : chat.users[0]}
          </h3>
          <p>
            {reciever
              ? Object.keys(reciever).length !== 0
                ? (function () {
                    const date = new Date(`${reciever?.lastSeen?.toDate()}`);
                    return 'LastSeen ' + date.toLocaleString();
                  })()
                : 'LastSeen unavailable'
              : null}
          </p>
        </HeaderInformation>
        <IconsContainer>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Body>
        {bodyMsgs}
        <EndMsg ref={endmsgRef} />
      </Body>

      <Footer>
        <Msgform>
          <Msginput
            value={msgInput}
            onChange={(e) => {
              setMsgInput(e.target.value);
            }}
          ></Msginput>
          <Msgbutton
            type="submit"
            hidden
            disabled={!msgInput}
            onClick={sendMsg}
          ></Msgbutton>
        </Msgform>
      </Footer>
    </MainContainer>
  );
}

export default Chatwindow;

const MainContainer = styled.div`
  /* border: 3px solid yellow; */
  flex: 1;
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  height: 100%;
`;
const Header = styled.div`
  /* border: 3px solid orange; */
  display: flex;
  background-color: white;
  /* justify-content: space-between; */
  align-items: center;
  border-bottom: 2px solid whitesmoke;
  border-left: 2px solid whitesmoke;
  padding: 0.8em;
`;
const HeaderInformation = styled.div`
  margin-left: 0.7em;
  flex: 1;
  > h3 {
  }
  > p {
    color: grey;
  }
`;
const Footer = styled.div`
  /* border: 3px solid yellowgreen; */
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.8em;
  border-left: 2px solid whitesmoke;
`;
const Body = styled.div`
  /* border: 3px solid black; */
  flex: 1;
  background-color: #e5ded8;
  border-left: 2px solid whitesmoke;
  padding: 0.8em;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
const IconsContainer = styled.div``;
const EndMsg = styled.div`
  margin-bottom: 50px;
`;
const Msginput = styled.input`
  width: 100%;
  outline: none;
  border: 0;
  margin-left: auto;
  padding: 0.3em;
  background-color: whitesmoke;
  font-size: 1.4rem;
  border-left: 2px solid whitesmoke;
`;
const Msgform = styled.form`
  width: 100%;
  border: 3px solid transparent;
`;
const Msgbutton = styled.button``;
