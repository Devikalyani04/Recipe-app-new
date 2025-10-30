
import React from "react";
import styled from "styled-components";
import { signInWithRedirect,signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const LoginPage = () => {
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      //await signInWithRedirect(auth, googleProvider);

    } catch (err) {
      alert("Google sign-in failed: " + err.message);
    }
  };

  const loginWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      //await signInWithRedirect(auth, facebookProvider);
    } catch (err) {
      alert("Facebook sign-in failed: " + err.message);
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <h2>Create an account</h2>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Enter your password" />
          <Checkbox>
            <input type="checkbox" /> I agree to the Terms & Conditions
          </Checkbox>
          <Button type="submit">Create Account</Button>
        </form>
        <Divider>OR</Divider>
        <SocialButtons>
          <GoogleButton onClick={loginWithGoogle}>Continue with Google</GoogleButton>
          <FacebookButton onClick={loginWithFacebook}>Continue with Facebook</FacebookButton>
        </SocialButtons>
      </FormContainer>
    </Wrapper>
  );
};

export default LoginPage;

{/*const Wrapper = styled.div`
  background-image: url("/LoginBackground.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;*/}

const Wrapper = styled.div`
  
  background-image: url("/LoginBackground.jpg") ;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
   width:100vw;                                    
  height:100vh;                                   
 
  display: flex;
  justify-content: center;
  align-items: center;
`;


const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.85);
  padding: 40px;
  border-radius: 15px;
  width: 350px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);

  h2 {
    margin-bottom: 20px;
    font-family: "Lobster Two", cursive;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
  }
`;

const Checkbox = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: #7c3aed;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const Divider = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GoogleButton = styled(Button)`
  background-color: #4285f4;
`;

const FacebookButton = styled(Button)`
  background-color: #3b5998;
`;
