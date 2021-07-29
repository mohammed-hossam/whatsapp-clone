import { useEffect, useState } from 'react';
import { db } from '../firebase';

function useContent(user) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    db.collection('chats')
      .where('users', 'array-contains', user.email)
      .onSnapshot((querySnapshot) => {
        const content = querySnapshot.docs.map((doc) => {
          const data = { id: doc.id, data: doc.data().users };
          // console.log(data);
          return data;
        });
        setContent(content);
      });
  }, []);

  return content;
}

export default useContent;
