
import React,{ useRef,useEffect,useState } from 'react';
import './Form.css';
import firebase from './firebase';
import { getDatabase, ref, child, get,update,set,push } from "firebase/database";
import { auth } from "./base";
import 'firebase/compat/database';
import Navbar1 from './Navbar1';
import Footer from './Footer';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import google from './google';
import {useLocation,useSearchParams} from 'react-router-dom';


export  default function Form({ user }) {
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [option5, setOption5] = useState('');
  const [option6, setOption6] = useState('');

  const [teacher,setTeacher] = useState([]);
  const [category,setCategory] = useState([]);
  const [topic,setTopic] = useState([]);
  const [type,setType] = useState([]);
  const [ques,setQues] = useState([]);
  const [td,setTD] = useState([]);
  const [sques,setSques] = useState([]);
  const [desc,setDesc] = useState([]);
  const [choices,setChoices] = useState([]);
  const [ans,setAns] = useState([]);
  const [qidtemp,setQid] = useState([]);

  const [newq,setNewq] = useState([]);
  const [newchoices,setNewchoices] = useState([]);
  const [newans,setNewans] = useState([]);
  const [newi,setI] = useState([]);
  const [keys,setKeys] = useState([]);

  const [count1,setCount1] = useState([]);
  const [ profile, setProfile ] = useState([]);
  var userCount;
  const [ testcount, setTest ] = useState([]);
  const [searchparams] = useSearchParams();
  console.log("Params",searchparams.get("id"));
  const handleOption1Change = (event) => {
    setOption1(event.target.value);
    setTeacher(event.target.value);

  };

  const usercounts = [];

  useEffect(() => {
    welcometoast();
  },[]);
  useEffect(() => {
      
  const firebaseRef1 = firebase.database().ref();
    firebaseRef1.child('users').once('value', snapshot => {
      const users = snapshot.val();
      let userId;
      // Iterate through all users and find a match based on username
      Object.keys(users).forEach(key => {
        if (users[key].name === user.displayName) {
          userId = key;
          userCount = users[key].numCorrected;
          console.log(userCount);
          setCount1(userCount)
        }
      });
     
   

    });
    usercounts.push(
      <p>{userCount}</p>
    )
  },[user])

console.log("USer",user.displayName);
// var flag = 0;
// var flagq = 0;
// log out function to log the user out of google and set the profile array to null
const logOut = () => {
    googleLogout();
    setProfile(null);
};

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
    setCategory(event.target.value);
  
    
  };

  const handleOption3Change = (event) => {
    setOption3(event.target.value);
    setTopic(event.target.value);
    
  };

  const handleOption4Change = (event) => {
    setOption4(event.target.value);
    setType(event.target.value);

  };
  const handleOption5Change = (event) => {
    setOption5(event.target.value);
    setTD(event.target.value);
  };
  const handleOption6Change = (event) => {
    setOption6(event.target.value);
    setQues(event.target.value);
  };
  
  // const { state } = useLocation();
  // const data = location.state;


  // const database = firebase.database();

  // // Create a user node in the database
  // const usersRef = database.ref('users');
  // const newUserRef = usersRef.push();
  
  // // Set the value of the new user node
  // newUserRef.set({
  //   name: user.displayName,
  //   email: user.email,
  //   numCorrected: 0 // initialize the number of corrected questions to 0
  // });
  
  const firebaseRef = firebase.database().ref();
  const currentUser = firebase.auth().currentUser;
  
  // Fetch all users from the database
  firebaseRef.child('users').once('value', snapshot => {
    const users = snapshot.val();
    let userId;
    let flaguser = 0;
    // Iterate through all users and find a match based on username
    Object.keys(users).forEach(key => {
      if (users[key].name === user.displayName) {
        userId = key;
        console.log("User Exists")
        flaguser = 1;
      }
    });
if(flaguser == 0)
{ firebaseRef.child('users').push({
      name:user.displayName,
      email:user.email,
      numCorrected: 0
    });
  
}
  // else{
  //   firebaseRef.child('users').push({
  //     name:user.displayName,
  //     email:user.email,
  //     numCorrected: 0
  //   });
  // }
      // User does not exist in the database, add a new entry
     
    
  });
  
  
  const options4 = [];
  for (let i = 1; i <= 100; i++) {
    options4.push(<option key={i} value={i}>{i}</option>);
  }
  const options2 = [];
  for (let i = 1; i <= 33; i++) {
    options2.push(<option key={i} value={i}>{i}</option>);
  }
  const options3 = [];
  for (let i = 1; i <= 20; i++) {
    options3.push(<option key={i} value={i}>{i}</option>);
  }

  function toast() {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function successtoast() {
    var x = document.getElementById("successtoast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function welcometoast() {
    var x = document.getElementById("welcometoast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  // const [data, setData] = useState([]);
  var test = []
  const fetchData = async () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `data/questionbank`)).then((snapshot) => {
      if (snapshot.exists()) {
       
        snapshot.forEach((childSnapshot) => {
                  const childData = childSnapshot.val();
                  // console.log("Keys",childSnapshot.key);
                  let keyarr = [];
                  keyarr.push(childSnapshot.key); 
            
                  // console.log("Type",typeof(keyarr[0]));
                  // for(let i =0;i<keyarr.length;i++)
                  // {
                  //   if(temp!=keyarr[i])
                  //   {
                  //     toast();
                  //   }
                  // }
                  
            
                  if((teacher==childData.teacher_info)&&(category==childData.category_id)&&(topic==childData.topic_id)&&(td==childData.topic_difficulty))
                  {
                    // flag = 1;
                    console.log(childSnapshot.key);
                    setKeys(childSnapshot.key);
                    let q = ques;
                    for(let i =0;i<childData.questions.length;i++)
                    {
                      console.log("Ques",ques);
                      console.log("QID",childData.questions[i].qid)
                      if(ques ==childData.questions[i].qid )
                      {
                        // flagq = 1;
                        setI(i);
                        setQid(childData.questions[i].qid);
                        setSques(childData.questions[i].question);
                        setDesc(childData.questions[i].desc)
                        setChoices(childData.questions[i].choices);
                       
                        if(childData.questions[i].question=="")
                        { 
                          setAns(childData.questions[i].answers);
                          
                        }
                    
      
                      }
                   
                      // ques = parseInt(ques);
                     
                   
                    }
                    let teacher1 = teacher;
                    let category1 = category;
                    let topic1 = topic;
                    let temp = teacher1 +"_"+category1 +"_"+ topic1;
                    for(let i = 0;i<keyarr.length;i++)
                    {
                       
                        console.log("Temp",temp);
                        console.log("keyarr",keyarr[i]);
                       
                    }
                    
                  }

                  // if(flagq == 0)
                  // {
                  //   toast();
                  // }
                  // if(flag == 0)
                  // {
                  //   toast();
                  // }
                  console.log(teacher);
                  console.log(category);
                  console.log(topic);
                  console.log(td);
                  console.log("Child Data");
                  console.log(childData.teacher_info);
                  console.log(childData.category_id);
                  console.log(childData.topic_id);
                  console.log(childData.topic_difficulty);
                  let teacher1 = teacher;
                  let category1 = category;
                  let topic1 = topic;
                  let temp = teacher1 +"_"+category1 +"_"+ topic1;
                  let x = keyarr.includes(temp);
                  // if(x == false)
                  // {
                  //   toast();
                  // }
               
                    // if((keyarr.includes(temp)))
                    // {
                    //       toast();
                    // }
                     
                      console.log("Temp",temp);
                      // console.log("keyarr",keyarr[i]);
                     
                  

                  // else{
                  //   toast();
                  // }
            

                
                // 
             
              
                // if(ques!==qidtemp )
                // { console.log("QIDTemp",qidtemp);
                //   toast();
                // }
          


              });
     
      } else { 
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  };
  const handleQuestion = (event) => {
    setNewq(event.target.innerText);
  };
  var i =0;
  var arrc = [];
  var arrc2 = [];
  var arr3 =[];
  var newarray = [];
  const handleChoices = (event) => {

    setNewchoices(event.target.innerText);
  
  }
 arrc = newchoices;
 console.log(Object.values(newchoices));
 console.log("String",arrc.toString());
 arrc2 = arrc.toString();
 console.log("arrc2",arrc2);
 arrc2 = arrc2.split(' ');
 arr3 = arrc2.toString();
 console.log("arrc22",arr3);
 arr3 = arr3.split('\n');
 console.log("arrc3",arr3);
 for(let i =0;i<arr3.length;i++)
 {
  if(arr3[i]!='')
  {
    newarray.push(arr3[i]);
  }
 }

 console.log("Newarr",newarray);
  const handleAns = (event) => {
    setNewans(event.target.innerText);

  }

  
  // const usersRef = dbRef.child('users');

 
  const updateData = async () => {
    const db = getDatabase();
    const updates = {};
    if(newq!="")
    {  
        
        updates["data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi + "/" + "question"] = newq;
         
    update(ref(db), updates);
    }
    if(newans!=""){
      updates["data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi + "/" + "answers"] = newans;
     
      update(ref(db), updates);

    }

    for(let i =0 ;i<results.length;i++)
    {
      updates["data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi + "/" + "choices" + "/" + i] = newarray[i];
 
      update(ref(db), updates);
    }
    let refstr = "data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi;
    const dbref = ref(db, refstr);

    let refstr1 = "data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi;
    const dbref1 = ref(db, refstr1);

    push(dbref, {
      modifiedby:user.displayName
    })
    push(dbref1, {
      corrected:'yes'
    })
    
    var userID;

    firebaseRef.child('users').once('value', snapshot => {
      const users = snapshot.val();
      let userId;
      // Iterate through all users and find a match based on username
      Object.keys(users).forEach(key => {
        if (users[key].name === user.displayName) {
          userId = key;
        }
      });
      if (userId) {
        // User exists in the database, update the count
        firebaseRef.child(`users/${userId}/numCorrected`).transaction(count => count + 1);
      }
   

    });

    successtoast();

  }
  

const results = [];
choices.forEach(choice => {
  results.push(
   <p>{choice}</p>
  );
  
});

console.log("jk");
console.log(arrc);
// console.log("Name",name);
console.log("NAME",localStorage.getItem("Name"));
  return (
    
    <div className='main'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Navbar1 />
         <div>
         <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>
         <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-database.js"></script>
    <br></br>
    <br></br>

    </div>
    <div className="dropdowns-container">
      
      <label htmlFor="dropdown1">Teacher:</label>
      <select id="dropdown1" value={option1} onChange={handleOption1Change}>
        <option value="">Select an option</option>
        <option value="T1">T1</option>
        <option value="T2">T2</option>
        <option value="T3">T3</option>
      </select>

      <br />

      <label htmlFor="dropdown2">Category ID:</label>
      <select id="dropdown2" value={option2} onChange={handleOption2Change}>
      <option value="Select an option" selected>Select an option</option>
       {options2}
        
      </select>

      <br />

      <label htmlFor="dropdown3">Topic ID:</label>
      <select id="dropdown3" value={option3} onChange={handleOption3Change}>
      <option value="Select an option" selected>Select an option</option>
     {options3}
      </select>
      <label htmlFor="dropdown4">Type:</label>
      <select id="dropdown4" value={option4} onChange={handleOption4Change}>
        <option value="">Select an option</option>
        <option value="FITB">FITB</option>
        <option value="MCQ">MCQ</option>
        <option value="DND">DND</option>
        <option value="MTF">MTF</option>
      </select>

      <br />
      <label htmlFor="dropdown5">Topic Difficulty:</label>
      <select id="dropdown5" value={option5} onChange={handleOption5Change}>
        <option value="">Select an option</option>
        <option value="Beginners">Beginners</option>
        <option value="Elementary">Elementary</option>
        <option value="Pre-Intermediate">Pre-Intermediate</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Upper Intermediate">Upper Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <br />
     
      <label htmlFor="dropdown6">Question ID:</label>
      <select id="dropdown6" value={option6} onChange={handleOption6Change}>
      <option value="Select an option" >Select an option</option>
       {options4}
      </select>
      

    </div>
    <button className='submit' id = "enterbtn" onClick={fetchData}><i class="fa fa-sign-in" aria-hidden="true"></i> Enter</button>
    <p class = "questioncorr">Number of questions corrected: {count1}</p>
<div className='editableText'>
  <div className='question'>
<p>{desc}</p>

<p contentEditable="true" onInput={handleQuestion}>{sques}</p>
   <p contentEditable="true" onInput={handleChoices}>{results}</p>
   <p contentEditable="true" onInput={handleAns}>{ans}</p>
   <p>{ console.log(user.displayName)}</p>
  
   {/* <p>{searchparams.get("id")}</p> */}
   {/* <p>Name: {fname}</p> */}
</div>

<br></br>
<br></br>
<br></br>
{/* <div id="toast">Invalid selection,try again!</div> */}
<div id="successtoast">Updated Successfully!</div>
<div id="welcometoast">Welcome {user.displayName}!</div>
{console.log("second" ,count1)}

<button className='submit' onClick={updateData}><i class="fa fa-save"></i> Save</button>
<button className= "signout"
            // style={{margin: '5%'}}
            variant="outline-danger"
            type="submit"
            onClick={() => auth.signOut()}
          >
            <i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out
          </button>
</div>
<Footer />
    </div>
    
  );
      }
