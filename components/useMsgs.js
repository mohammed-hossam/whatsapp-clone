import { useEffect, useState } from 'react';
import { db } from '../firebase';

function useMsgs() {
  const [bodyMsgs, setBodyMsgs] = useState('');

  useEffect(() => {
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
  }, []);
  return bodyMsgs;
}

export default useMsgs;
