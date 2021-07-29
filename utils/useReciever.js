import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

function useReciever(data) {
  const [reciever, setReciever] = useState();
  const curentuser = auth.currentUser;
  // console.log(data[1]);
  useEffect(() => {
    if (data[0] === curentuser.email) {
      db.collection('users')
        .where('email', '==', data[1])
        .onSnapshot((querySnapshot) => {
          const content = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            // console.log(data);
            return data;
          });
          setReciever({ ...content[0] });
        });
    }

    if (data[1] === curentuser.email) {
      db.collection('users')
        .where('email', '==', data[0])
        .onSnapshot((querySnapshot) => {
          const content = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return data;
          });
          setReciever({ ...content[0] });
        });
    }
  }, [data]);

  return reciever;
}

export default useReciever;
