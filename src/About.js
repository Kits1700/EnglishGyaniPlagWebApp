import React,{ useRef,useEffect,useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Form.css';
import { firestore } from "./firebase";
import { addDoc,collection,doc,setDoc,getDoc,onSnapshot,query } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { type } from '@testing-library/user-event/dist/type';
import './Ques';
import Ques1 from './Ques';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Form from './Form';
  
const About = () => {
  const navigate = useNavigate();
  var [questions, setQuestions] = useState([]);
  var [ans, setAns] = useState([]);

  const db = getFirestore();
  //const refDb = db.collection('contentRecs');
  const shoot = () => {
    alert("HELLOO!");
  }
  useEffect(() => {
    const q = query(collection(db, 'contentRecs'))
    onSnapshot(q, (querySnapshot) => {
      const questions = []
      const ans = []
      querySnapshot.forEach((doc) => {
  
        questions.push(doc.data().question);
        ans.push(doc.data().ans);
        console.log("NNN");
   
       
       
      })

      setQuestions(questions)
      setAns(ans);
      
      
    })
  }, [])
  // for(let i=0;i<questions.length;i++)
  // {
  //   // if(messageRef.current.value!=questions[i])
  //   // {
  //   //   shoot();
  //   // }
  //   if(messageRef.current.value == questions[i])
  //   {
  //       navigate('/about');
  //    console.log("MATCH");
  //   question.push(questions[i]);

     


  //   }
  //   setQuestion(question);
 
  //   // else if(messageRef.current.value != questions[i]){
  //   //   shoot();
  //   // }
  // }
  
  console.log("questions",questions[0]);

  return (

  <>

<div id = "home">
<h1>{questions}</h1>
<h3>{ans}</h3>
</div>
    
     <button onClick={()=>navigate(-1)}>Go Back Home</button>
     <button onClick={()=>navigate(-1)}>Edit</button>
  </>
  )
};
  
export default About;