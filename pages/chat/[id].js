import Chatwindow from '../../components/Chatwindow';
import Sidebar from '../../components/Sidebar';
import styled from 'styled-components';
import { db } from '../../firebase';
import Message from '../../components/Message';

function chat({ chat, messages }) {
  const serverRenderedData = JSON.parse(messages).map((message) => {
    return <Message key={message.id} user={message.user} message={message} />;
  });
  // console.log(JSON.parse(messages));

  return (
    <MainContainer>
      <Sidebar />
      <Chatwindow
        chat={chat}
        messages={messages}
        serverRenderedData={serverRenderedData}
      />
    </MainContainer>
  );
}

export default chat;

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);

  // formsgs
  const msgRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();
  const msgs = msgRes.docs
    .map((doc) => {
      return { id: doc.id, ...doc.data() };
    })
    .map((messages) => {
      return { ...messages, timestamp: messages.timestamp.toDate().getTime() };
    });
  console.log(msgs);
  // forchat
  const chatRes = await ref.get();
  const chat = { id: chatRes.id, ...chatRes.data() };
  return { props: { chat: chat, messages: JSON.stringify(msgs) } };
}
