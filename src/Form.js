import React, { useRef, useEffect, useState } from "react";
import "./Form.css";
import firebase from "./firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  set,
  push,
  onValue,
  on,
} from "firebase/database";
import { auth } from "./base";
import "firebase/compat/database";
import Navbar1 from "./Navbar1";
import Footer from "./Footer";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import google from "./google";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Form({ user }) {
  const dbRef = ref(getDatabase());
  const [data1, setData1] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [option6, setOption6] = useState("");

  const newarray = [];
  var temp100;
  var temp101;
  let flagP ;
  const [invalid, setInvalid] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [category, setCategory] = useState([]);
  const [topic, setTopic] = useState([]);
  const [type, setType] = useState([]);
  const [ques, setQues] = useState([]);
  const [td, setTD] = useState([]);
  const [t, setT] = useState([]);
  const [sques, setSques] = useState([]);
  const [flagC, setFlagC] = useState([]);
  const [desc, setDesc] = useState([]);
  const [choices, setChoices] = useState([]);
  const [ans, setAns] = useState([]);
  const [dnd, setAnsDND] = useState([]);
  const [mtf, setAnsMTF] = useState([]);
  const [qidtemp, setQid] = useState([]);
  const [newiN, setIN] = useState([]);
  const [newq, setNewq] = useState([]);
  const [newchoices, setNewchoices] = useState([]);
  const [newans, setNewans] = useState([]);
  const [m, setMTF] = useState([]);
  const [d, setDND] = useState([]);
  const [newi, setI] = useState([]);
  const [keys, setKeys] = useState([]);
  const [newk, setK] = useState([]);
  const [count1, setCount1] = useState([]);
  const [TN, setTopicName] = useState([]);
  const [profile, setProfile] = useState([]);
  const [flagD, setFlagD] = useState([]);
  const [flagM, setFlagM] = useState([]);
  var userCount;
  const [testcount, setTest] = useState([]);
  const [searchparams] = useSearchParams();
  // console.log("Params",searchparams.get("id"));
  const handleOption1Change = (event) => {
    setOption1(event.target.value);
    setTeacher(event.target.value);
  };

  const usercounts = [];

  useEffect(() => {
    welcometoast();
  }, []);

  useEffect(() => {
    const firebaseRef1 = firebase.database().ref();
    firebaseRef1.child("users").once("value", (snapshot) => {
      const users = snapshot.val();
      let userId;
      // Iterate through all users and find a match based on username
      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
          userCount = users[key].numCorrected;
          // console.log(userCount);
          setCount1(userCount);
        }
      });
    });
    usercounts.push(<p>{userCount}</p>);
  }, [user]);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      // Get the downloaded data
      const downloadedData = snapshot.val();

      // Calculate the size of the downloaded data
      const downloadedDataString = JSON.stringify(downloadedData);
      const downloadedDataBytes = new Blob([downloadedDataString]).size;

      // Update the total downloaded data size
      downloadedDataSize += downloadedDataBytes;

      console.log("Downloaded data size:", downloadedDataSize / 1048576, "MB");
    });
  },[]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const snapshot = await get(child(dbRef, "data/questionbank"));
        if (snapshot.exists()) {
          const questionData = snapshot.val();
          // Save the data locally
          setData1(questionData);
        } else {
          // Handle the case when the data does not exist
          console.log("No data found in the database.");
        }
      } catch (error) {
        // Handle any errors that occurred during fetching
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
  }, []);

  // Example usage: Access the locally saved data
  console.log("Data1", data1);

  console.log("Data1Type", typeof data1);
  console.log("User", user.displayName);

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
    setT(event.target.value);
  };
  const handleOption5Change = (event) => {
    setOption5(event.target.value);
    setTD(event.target.value);
  };
  const handleOption6Change = (event) => {
    setOption6(event.target.value);
    setQues(event.target.value);
  };

  const firebaseRef = firebase.database().ref();
  const currentUser = firebase.auth().currentUser;

  // Fetch all users from the database
  firebaseRef.child("users").once("value", (snapshot) => {
    const users = snapshot.val();
    let userId;
    let flaguser = 0;
    // Iterate through all users and find a match based on username
    Object.keys(users).forEach((key) => {
      if (users[key].name === user.displayName) {
        userId = key;
        // console.log("User Exists")
        flaguser = 1;
      }
    });

    if (flaguser == 0) {
      firebaseRef.child("users").push({
        name: user.displayName,
        email: user.email,
        numCorrected: 0,
        quescorr: [],
        incorrID: [],
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
    options4.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const options2 = [];
  for (let i = 1; i <= 33; i++) {
    options2.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const options3 = [];
  for (let i = 1; i <= 20; i++) {
    options3.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  function toast() {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 5000);
  }
  function successtoast() {
    var x = document.getElementById("successtoast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function welcometoast() {
    var x = document.getElementById("welcometoast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  // const [data, setData] = useState([]);

  const saveIDs = async () => {
    let teacher2 = teacher;
    let category2 = category;
    let topic2 = topic;
    let type2 = t;
    let topicdiff2 = td;

    temp101 =
      teacher2 +
      "_" +
      category2 +
      "_" +
      topic2 +
      "_" +
      type2 +
      "_" +
      topicdiff2;
    console.log("TTEMP2", temp101);
    if (flagP == 1) {
      console.log("FLAGP", flagP);
      
    } 
    else {
      console.log("FLAGP", flagP);
      setInvalid(temp101);
      console.log("p", temp101);
      saveAndClear();
      toast();

      firebaseRef.child("users").once("value", (snapshot) => {
        const users = snapshot.val();
        let userId;
        // Iterate through all users and find a match based on username
        Object.keys(users).forEach((key) => {
          if (users[key].name === user.displayName) {
            userId = key;
          }
        });
        if (userId) {
          firebaseRef.child(`users/${userId}/incorrID`).push(temp101);
        }
      });
    }
  };

  // var ref = firebase.database().ref('/data/questionbank/');
  // ref.remove()
  //   .then(function() {
  //       console.log("Record deleted successfully");
  //   })
  //   .catch(function(error) {
  //       console.log("Error deleting record: " + error.message);
  //   });
  // Try saving dB locally, iterate through that

  let downloadedDataSize = 0;

  // Listen for the "value" event

  const fetchData = async () => {
    setFlagD();
    setFlagM();
   
    if (data1) {
      Object.keys(data1).forEach((recId) => {
        console.log("Rec", recId);
        console.log("catID", data1[recId].category_id);

        for (let i = 0; i < data1[recId].topics_content.length; i++)
          for (
            let k = 0;
            k < data1[recId].topics_content[i].topic_content.length;
            k++
          ) {
            {
              if (
                teacher == data1[recId].topics_content[i].teacher_info &&
                category == data1[recId].category_id &&
                topic == data1[recId].topics_content[i].topic_id &&
                td ==
                  data1[recId].topics_content[i].topic_content[k]
                    .level_difficulty &&
                t == data1[recId].topics_content[i].topic_content[k].type
              ) {
                setK(k);
                setTopicName(data1[recId].topics_content[i].topic_name);
                if (
                  data1[recId].topics_content[i].topic_content[k].type == "DND"
                ) {
                  setFlagD(1);
                  setChoices();
                }

                if (
                  data1[recId].topics_content[i].topic_content[k].type == "MTF"
                ) {
                  setFlagM(1);
                  setChoices();
                }

                setIN(i);
                console.log("KK", recId);
                setKeys(recId);

                let q = ques;
                for (
                  let j = 0;
                  j <
                  data1[recId].topics_content[i].topic_content[k].level_content
                    .questions.length;
                  j++
                ) {
                  if (
                    ques ==
                    data1[recId].topics_content[i].topic_content[k]
                      .level_content.questions[j].qid
                  ) {flagP = 1;
                    setI(j);
                    setQid(
                      data1[recId].topics_content[i].topic_content[k]
                        .level_content.questions[j].qid
                    );
                    setSques(
                      data1[recId].topics_content[i].topic_content[k]
                        .level_content.questions[j].question
                    );
                    setNewq(
                      data1[recId].topics_content[i].topic_content[k]
                        .level_content.questions[j].question
                    );
                    setDesc(
                      data1[recId].topics_content[i].topic_content[k].desc
                    );
                    setChoices(
                      data1[recId].topics_content[i].topic_content[k]
                        .level_content.questions[j].choices
                    );
                    setAns(
                      data1[recId].topics_content[i].topic_content[k]
                        .level_content.questions[j].answers
                    );
                    setNewans(
                      data1[recId].topics_content[i].topic_content[k]
                        .level_content.questions[j].answers
                    );

                    
                    console.log("FLAGGG", flagP);
                  }

                  // ques = parseInt(ques);
                }
                let teacher1 = teacher;
                let category1 = category;
                let topic1 = topic;
                let type1 = t;
                let topicdiff1 = td;
                let qid1 = ques;
                let temp =
                  teacher1 +
                  "_" +
                  category1 +
                  "_" +
                  topic1 +
                  "_" +
                  type1 +
                  "_" +
                  topicdiff1 +
                  "_" +
                  qid1;
                setB(temp);
                temp100 =
                  teacher1 +
                  "_" +
                  category1 +
                  "_" +
                  topic1 +
                  "_" +
                  type1 +
                  "_" +
                  topicdiff1;
                console.log("TTEMP", temp100);
               
                // setC(temp100);
              }
         
            }
           
          }


        // Access other properties within the topic
        // For example, if you have a 'questions' property under each topic:
      });
    }
    saveIDs();
  };

  const handleQuestion = (event) => {
    setNewq(event.target.innerText);
  };
  var i = 0;
  var arrc = [];
  var arrc2 = [];
  var arr3 = [];
  function handleKeyDown(event) {
    if (event.keyCode === 32) {
      // check if spacebar is pressed
      event.preventDefault(); // prevent default behavior (adding comma)
    }
  }
  const handleChoices = (event) => {
    setNewchoices(event.target.innerText);
  };

  const handleAns = (event) => {
    setNewans(event.target.innerText);
  };

  // const usersRef = dbRef.child('users');

  var arrc1 = [];
  var arrc21 = [];
  var arr31 = [];
  const db = ref(getDatabase());
  const updateData = async () => {
    // console.log("FlagM",flagM);
    // console.log("FlagD",flagD);
    if (flagM == 1) {
      // console.log("FlagM");
    } else if (flagD == 1) {
      // console.log("FlagD");
    } else if (flagM != 1 || flagD != 1) {
      arrc = newchoices;
      arrc2 = arrc.toString();
      arrc2 = arrc2.split(" ");
      arr3 = arrc2.toString();
      arr3 = arr3.split("\n");

      arrc1 = choices;

      if (arrc1 != "") {
        arrc21 = arrc1.toString();
        arrc21 = arrc21.split(" ");
        arr31 = arrc21.toString();
        arr31 = arr31.split("\n");
      }

      for (let i = 0; i < arr3.length; i++) {
        if (arr3[i] != "") {
          newarray.push(arr3[i]);
        }
      }
    }

    for (let i = 0; i < newarray.length; i++) {
      if (newarray[i].includes(",,")) {
        setFlagC(1);

        newarray[i] = newarray[i].replace(/,,/g, ";");
      }
    }

    for (let i = 0; i < newarray.length; i++) {
      newarray[i] = newarray[i].replace(/,/g, " ");
    }

    const updates = {};
    var newQ1 = "";

    if (newq != "" && flagD != 1) {
      updates[
        "data/" +
          "questionbank/" +
          keys +
          "/" +
          "topics_content" +
          "/" +
          newiN +
          "/" +
          "topic_content" +
          "/" +
          newk +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          newi +
          "/" +
          "question"
      ] = newq;

      data1[keys].topics_content[newiN].topic_content[newk]
      .level_content.questions[newi].question = newq
      console.log(
        "NewQ",
        updates[
          "data/" +
            "questionbank/" +
            keys +
            "/" +
            "topics_content" +
            "/" +
            newiN +
            "/" +
            "topic_content" +
            "/" +
            newk +
            "/" +
            "level_content" +
            "/" +
            "questions" +
            "/" +
            newi +
            "/" +
            "question"
        ]
      );
      // console.log("Newq is  not null");
      console.log("Keys", keys);

      // update(ref(getDatabase()), updates);

      // successtoast();
    } else if (newq == "") {
      // console.log("Newq is null");
    }

    if (newans != "" && flagD == 1) {
      updates[
        "data/" +
          "questionbank/" +
          keys +
          "/" +
          "topics_content" +
          "/" +
          newiN +
          "/" +
          "topic_content" +
          "/" +
          newk +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          newi +
          "/" +
          "answers"
      ] = newans;

      data1[keys].topics_content[newiN].topic_content[newk]
      .level_content.questions[newi].answers = newans;

      // update(ref(getDatabase()), updates);
    } else if (newans != "" && flagM == 1) {
      updates[
        "data/" +
          "questionbank/" +
          keys +
          "/" +
          "topics_content" +
          "/" +
          newiN +
          "/" +
          "topic_content" +
          "/" +
          newk +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          newi +
          "/" +
          "answers"
      ] = newans;


      data1[keys].topics_content[newiN].topic_content[newk]
      .level_content.questions[newi].answers = newans;

      // update(ref(getDatabase()), updates);
    } else {
      updates[
        "data/" +
          "questionbank/" +
          keys +
          "/" +
          "topics_content" +
          "/" +
          newiN +
          "/" +
          "topic_content" +
          "/" +
          newk +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          newi +
          "/" +
          "answers"
      ] = newans;


      data1[keys].topics_content[newiN].topic_content[newk]
      .level_content.questions[newi].answers = newans;

      // update(ref(getDatabase()), updates);
    }

    for (let i = 0; i < arr3.length; i++) {
      if (arr3[i] != "") {
        for (let i = 0; i < results.length; i++) {
          updates[
            "data/" +
              "questionbank/" +
              keys +
              "/" +
              "topics_content" +
              "/" +
              newiN +
              "/" +
              "topic_content" +
              "/" +
              newk +
              "/" +
              "level_content" +
              "/" +
              "questions" +
              "/" +
              newi +
              "/" +
              "choices" +
              "/" +
              i
          ] = newarray[i].replace(/;/g, ",");



          data1[keys].topics_content[newiN].topic_content[newk]
          .level_content.questions[newi].choices[i] = newarray[i].replace(/;/g, ",");
        }
      } else {
        // console.log("Else loop");
      }
    }

    var userID;

    firebaseRef.child("users").once("value", (snapshot) => {
      const users = snapshot.val();
      let userId;
      // Iterate through all users and find a match based on username
      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
        }
      });
      if (userId) {
        // User exists in the database, update the count
        firebaseRef
          .child(`users/${userId}/numCorrected`)
          .transaction((count) => count + 1);
        firebaseRef.child(`users/${userId}/quescorr`).push(b);
      }
    });
    update(ref(getDatabase()), updates);
    successtoast();
    saveAndClear();
    // refreshEditableContent();

    // location.reload();
  };
  const results = [];

  if (flagM == 1) {
    // console.log("MTF");
  } else if (flagD == 1) {
    // console.log("DND");
  } else {
    choices.forEach((choice) => {
      results.push(
        <span onKeyDown={handleKeyDown} autocorrect="off" autocomplete="off">
          {choice}
        </span>
      );
    });
  }

  function saveAndClear() {
    // results = [];
    // newarray = [];
    setSques();

    // setNewq();
    setDesc();

    setNewchoices([]);
    setChoices([]);
    setMTF();
    setDND();
    setTopicName();
    setFlagD();
    setFlagM();
    setAns();
    setNewans();
    flagP = 0;
  }

  return (
    <div className="main">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
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
          <option value="Select an option" selected>
            Select an option
          </option>
          {options2}
        </select>

        <br />

        <label htmlFor="dropdown3">Topic ID:</label>
        <select id="dropdown3" value={option3} onChange={handleOption3Change}>
          <option value="Select an option" selected>
            Select an option
          </option>
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
          <option value="Select an option">Select an option</option>
          {options4}
        </select>
      </div>
      <button className="submit" id="enterbtn" onClick={fetchData}>
        <i class="fa fa-sign-in" aria-hidden="true"></i> Enter
      </button>
      {/* <p class = "questioncorr">Number of questions corrected: {count1}</p> */}
      <div className="editableText">
        <div className="question">
          <div id="topic">Topic Name: {TN}</div>
          <div>{desc}</div>
          <div class="p1">Q:</div>
          <div
            id="one"
            contentEditable="true"
            class="p2"
            onInput={handleQuestion}
          >
            {sques}
          </div>

          <div id="two" contentEditable="true" onInput={handleChoices}>
            {results}
          </div>
          <div class="p1">Ans:</div>
          <div id="three" contentEditable="true" class="p2" onInput={handleAns}>
            {type === "DND" ? ans : type === "MTF" ? ans : ans}
          </div>
          <p>{console.log(user.displayName)}</p>

          {/* <p>{searchparams.get("id")}</p> */}
          {/* <p>Name: {fname}</p> */}
        </div>

        <br></br>
        <br></br>
        <br></br>
        <div id="toast">Invalid selection,try again!</div>
        <div id="successtoast">Updated Successfully!</div>
        <div id="welcometoast">Welcome {user.displayName}!</div>
        {/* {console.log("second" ,count1)} */}
        <button className="submit" onClick={updateData}>
          <i class="fa fa-save"></i> Save
        </button>
        <button
          className="signout"
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
