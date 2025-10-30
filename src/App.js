import Pages from "./pages/Pages";
import Category from "./components/Category";
import {BrowserRouter} from "react-router-dom";
import Search from './components/Search';
import styled from "styled-components";
import {Link,useLocation} from "react-router-dom";
import{GiKnifeFork} from "react-icons/gi";
import { useEffect, useState } from "react";
import { auth } from "./firebase";  
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginPage from "./LoginPage";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntroSection from "./components/IntroSection";
import { GroceryListProvider } from './context/GroceryListContext';


function App() {
  
  const [user, setUser] = useState(null);
   const location = useLocation();

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return () => unsub();
}, []);


return (
  
    <div className="App">
      
        {/*<Nav isLogin={!user}>
          <GiKnifeFork />
          <Logo to={"/"}>Foodie-Hub</Logo>
          {user && (
            <>
             
              <LogoutButton onClick={() => signOut(auth)}>Logout</LogoutButton>
            </>
          )}
        </Nav>*/}

        {/*<Navbar user={user} onLogout={() => signOut(auth)} />*/}

        {user && <Navbar user={user} onLogout={() => signOut(auth)} />}

        {!user ? (
          
           <LoginPage />
          
        ) : (
          <>
          <Container>
              {location.pathname === "/" && (
            <>
              <Hero />
              <IntroSection />
            </>
          )}
            
            <Pages />
            </Container>
          </>
        )}
    
    </div>
   
  );
}




export default App;
