import Head from 'next/head';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {
  const signinHandel = () => {
    auth.signInWithPopup(provider).then((result) => {
      var user = result.user;
      console.log(user);
    });
  };

  return (
    <MainContainer>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="/whatsapp--v1.png" />
        <Button onClick={signinHandel}>SIGN IN WITH GMAIL</Button>
      </LoginContainer>
    </MainContainer>
  );
}

export default Login;

const MainContainer = styled.div`
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const Logo = styled.img``;
const Button = styled.button``;
