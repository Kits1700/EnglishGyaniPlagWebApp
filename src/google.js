// // import React from 'react';

// // import { GoogleLogin } from '@react-oauth/google';
// // import { Navigate } from "react-router-dom";
// // import {useNavigate} from "react-router-dom"
// // const google = () => {
// //     const navigate = useNavigate();
// //     return (
// //         <GoogleLogin
// //             onSuccess={credentialResponse => {
// //                 navigate("/pg");
// //                 console.log("Creds",credentialResponse);
// //                 console.log("ClientID",credentialResponse.clientId);
// //                 // const responsePayload = decodeJwtResponse(credentialResponse);
// //             }}
// //             onError={() => {
// //               console.log('Login Failed');
// //             }}
          
// //           />
// //     )
// // }

// // export default google;
// // import React from 'react';
// // import { GoogleLogin } from '@react-oauth/google';

// // function google() {
// //     const responseMessage = (response) => {
// //         console.log(response);
// //     };
// //     const errorMessage = (error) => {
// //         console.log(error);
// //     };
// //     const navigate = useNavigate();
// //     return (
// //         <div>
// //             <h2>Google Login</h2>
// //             <br />
// //             <br />
// //             <GoogleLogin onSuccess={responseMessage => {
// //               navigate('/pg');
// //               console.log(responseMessage);
// //             }} onError={errorMessage} />
// //         </div>
// //     )
// // }
// // export default google;

import React, { useState, useEffect,useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {createSearchParams,Link,useNavigate} from "react-router-dom";
// import './Form.css';
import './google.css';
import Form from './Form';
import firebase from './firebase';
import { getDatabase, ref, child, get,update,set,push } from "firebase/database";
import 'firebase/compat/database';

function google(props) {
    const UserContext = React.createContext();
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [ name,setName] = useState([]);
    const navigate = useNavigate();
    let name1 = "Hi2";
    
    // const [state, setState] = useState({
    //    fname:"KITS"
    //   });

  
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
           
        },
        [ user ]
    );
    useEffect(
      () => {
     
        setName(profile.name);
        localStorage.setItem("Name",profile.name);
        sessionStorage.setItem("Name1",profile.name);
        name1 = profile.name;
      }
    );
    console.log(name);
    const writefile = () => {
        const fs = require('fs'); 
        const data = "This is the new content of the file."; 
        fs.writeFile('file.txt', data, (err) => { 
        if(err) { 
        throw err; 
        console.log("Data has been written to file successfully."); 
    }}); 
    }
    const updateData = async () => {
       
        const db = getDatabase();
        const updates = {};
        if(name1!="")
        {
            updates["data/" + "users/" +"name/"] = "Keerthana";
             
        update(ref(db), updates);
        }
    
      };


    // console.log(typeof(name));
    // let name1 = profile.name.toString();
    let username = profile.name;
    let h = username
    // const data = {state:name};

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {setUser(codeResponse);updateData(); },
        onError: (error) => console.log('Login Failed:', error)
    });
    const mainlogin = () => {
        login();
        // updateData();
        // if(updateData())
        // {
        //     navigate('/pg');
        // }
        navigate('/pg');

    }
    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
//    localStorage.setItem("Name",profile.name);
    return (
        <div>
            <h2>English Gyani App Plagiarism Corrector</h2>
            <br />
            <br />
           <button className='loginbtn' onClick={() => {mainlogin()}}>Sign In </button>
{/*               
            <button className='loginbtn' onClick={() => login()}>Sign In </button> */}
          {/* {setName(profile.name)} */}
          {/* <Link  to={{
            pathname: "/pg",
            data: "kits"
          }}>  <button className='loginbtn' onClick={() => login()}>Sign In </button></Link> */}
              
                <div className='profilename'>
          
                {/* <Form name = {profile.name}/> */}
                </div>
          
        </div>
    );
}
export default google;

// import React, { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google';
// import {useNavigate} from "react-router-dom"
// function google() {
//     const [ user, setUser ] = useState([]);
//     const [ profile, setProfile ] = useState([]);
//     const navigate = useNavigate();
//     const responseMessage = (response) => {
//         console.log(response);
//     };
//     const errorMessage = (error) => {
//         console.log(error);
//     };
  
//     useEffect(
//         () => {
//             if (user) {
//                 axios
//                     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                         headers: {
//                             Authorization: `Bearer ${user.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         setProfile(res.data);
//                     })
//                     .catch((err) => console.log(err));
//             }
//         },
//         [ user ]
//     );

//     console.log(profile.name);
//     return (
//         <div>
//             <h2>Google Login</h2>
//             <br />
//             <br />
//             <GoogleLogin onSuccess={responseMessage => {
//               navigate('/pg');
//               {setUser(responseMessage)}
//               console.log(responseMessage);
//             }} onError={errorMessage} />
//         </div>
//     )
// }
// export default google;