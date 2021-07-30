import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { db } from '../firebase';
import firebase from 'firebase/app';
function useAuth() {
  const [user, setUser] = useState('no user yet');
  const [loading, setLoading] = useState(false);
  //3mlna hena loading state 3shan fl function fl 2wel ht3ml return l user fady 2bl mtnfz el useEffect

  useEffect(() => {
    // console.log('useauth useEffect');
    auth.onAuthStateChanged(function handleAuth(user) {
      if (user) {
        setUser(user);
        setLoading(true);
        db.collection('users').doc(user.uid).set(
          {
            Name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
          //merge deh 3shan e7na mst5dmen set w set bt3ml replace lele mwgod fa7na b merge:true bn2olo lw mwgoda e3ml update 2w sebha bs mt3mlsh replace
        );
      } else {
        setUser(null);
        setLoading(true);
      }
    });
  }, [user]);

  return [user, loading];
}

export default useAuth;
