import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';
import useAuth from '../components/useAuth';
import Login from './Login';
import Loading from './Loading';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuth();
  // console.log(user);
  // useEffect(() => {
  //   if (user) {
  //     db.collection('users').doc(user.uid).set(
  //       {
  //         Name: user.displayName,
  //         email: user.email,
  //         photoURL: user.photoURL,
  //         lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
  //       },
  //       { merge: true }
  //     );
  //   }
  // }, [user]);

  if (!loading) {
    // console.log(loading);
    return <Loading />;
  }
  return (
    <Fragment>
      <Head>
        <title>whatsapp</title>
        <meta name="description" content="whatsapp by create next app" />
        <link rel="icon" href="\whatsapp--v1.png" />
      </Head>
      {!user ? <Login /> : <Component {...pageProps} />}
    </Fragment>
  );
}

export default MyApp;
