// import React from "react";
// import {BrowserRouter,Routes,Route} from "react-router-dom";
// import Home from "./Home";
// import About from "./About";
// import Form from "./Form";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Google from './google';
// import './Login.css';
// import { Navigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function Login() {
    
//   return (
//       <>
//       <div className="main-login">
//       <Navbar />
//       <div className="signin">
//       <GoogleOAuthProvider clientId="971831979037-kkaargk66kvujj0dc72anfqtugaqv70v.apps.googleusercontent.com">
//           <Google />   
//       </GoogleOAuthProvider>
      

//       </div>
//    <Footer />
//       </div>
     
//       {/* <Routes>
//         <Route exact path="/" element={<Form/>}/>
//         <Route exact path="/about" element={<About/>}/>
//       </Routes> */}
 
//       </>
//   );
// }
  
// export default Login;
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword
} from "./base";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

import React, { useState } from "react";
import './Login.css';
import Navbar from './Navbar';
import Footer from './Footer';
// import "../App.css";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  return (
    
    <div>
                    
    {/* <div class="hero-image"></div>
    <div class="hero-text"></div> */}



         
                  <div>
                  

                  <h3>English Gyani Plagiarism Corrector</h3>
                 
                       <button className="sign"
                        variant="outline-primary"
                        onClick={signInWithGoogle}
                      > 
                  Sign-in
                      </button> 
               {/* <img class = 'imgbtn' src={require('./btn3.png')} height="42" onClick={signInWithGoogle}></img> */}
                  </div>
              
          
          <Footer />
          
        </div>
     
   
 
  );
};

export default Login;
