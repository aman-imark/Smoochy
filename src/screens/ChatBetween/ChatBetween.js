import React, { useEffect, useRef, useState } from "react";
import TopHeader from "../../components/TopHeader";
import {
  collection,
  query,
  onSnapshot,
  Timestamp,
  addDoc,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useLocation } from "react-router-dom";
import BottomTabs from "../../components/BottomTabs";

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { getData, postData } from "../../services/authService";
import { showToast } from "../../services/toastService";
import LoaderService from "../../services/loader";



const ChatBetween = () => {
  const location = useLocation();
  const person = location.state;
  // console.log('person: ', person)
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [roomId, setRoomId] = useState("");
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageRef = useRef(null);
  const [personStatus, setPersonStatus] = useState(null);



  useEffect(() => {
    getUser(token);
  }, []);



  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log('Messages: ', messages);

  const scrollToBottom = () => {
    var objDiv = document.getElementById("boxData");
    if (objDiv) {
      objDiv.scrollTop = objDiv?.scrollHeight;
    }
  };




  const getUser = () => {
    setIsLoading(true);
    getData("/my-profile", token)
      .then((resp) => {
        console.log("my-profile", resp);
        if (resp.status === "success") {
          setUser(resp.data);
          // console.log("user   " + JSON.stringify(user));
          console.log("Person   " + JSON.stringify(person));
          handlePersonChat(person, resp.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        showToast(err, "Profile not fatched!");
      });
  };

  function getMessages(roomId) {
    return onSnapshot(
      query(
        collection(db, "chats", roomId, "messages"),
        orderBy("time", "asc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          // console.log("Doc" + doc);
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        // console.log("messages" + messages);
        setMessages(messages);
      }
    );
  }

  const handlePersonChat = async (person, user) => {
    console.log(user.id, " and ", person.id);
    let personid = person.id;
    let userid = user.id;
    let roomid = [userid.toString(), personid.toString()].sort();

    roomid = roomid[0] + roomid[1];
    console.log(roomId);

    getFriendProfileStatus(person.id);
    updateMsgReadStatus(person.id, user.id);

    setRoomId(roomid);
    setSelectedPerson(person);
    getMessages(roomid);

    const chats_ref = doc(db, "chats", roomid);
    const myId = userid;
    const docSnap = await getDoc(chats_ref);
    // console.log(docSnap);

    if (docSnap.exists()) {
      updateDoc(chats_ref, {
        [myId]: {
          unread_count: 0,
        },
      });
    } else {
      await setDoc(chats_ref, {
        [myId]: {
          unread_count: 0,
        },
      });
    }

    setTimeout(() => {
      scrollToBottom();
    }, 500);
  };

  const updateUnreadCount = async () => {
    // console.log("call 1");

    const chats_ref = doc(db, "chats", roomId);
    // console.log(chats_ref);

    const partnerId = selectedPerson.id.toString();
    const docSnap = await getDoc(chats_ref);

    if (docSnap.exists()) {
      let roomDetail = docSnap.data();
      let partnerUnreadCount =
        roomDetail &&
        roomDetail[partnerId] &&
        roomDetail[partnerId].unread_count;
      updateDoc(chats_ref, {
        [partnerId]: {
          unread_count: partnerUnreadCount ? partnerUnreadCount + 1 : 1,
        },
      }).then(() => {
        // console.log('unread count added');
      });
    } else {
      await setDoc(chats_ref, {
        [partnerId]: {
          unread_count: 1,
        },
      }).then(() => {
        console.log("unread count added");
      });
    }
  };

  const sendMsg = async (e) => {
    e.preventDefault();
    const msg = message.trim();
    // setUsers();
    if (msg) {
      const msgObj = {
        time: Timestamp.now(),
        message: msg,
        sender: user.id.toString(),
        receiver: selectedPerson.id.toString(),
      };

      // console.log("Msg Obj:     " + JSON.stringify(msgObj));

      setMessages((oldArray) => [...oldArray, msgObj]);
      // console.log(messages);

      updateUnreadCount();

      setTimeout(() => {
        scrollToBottom();
      }, 100);
      try {
        await addDoc(collection(db, "chats", roomId, "messages"), msgObj);
      } catch (error) {
        console.error(error);
      }
      const payload = { user_id: selectedPerson.id, message: msg }
      postData('/message', payload, token).then((res) => {
        console.log(res);
        if(res.status === 'success'){ 
         console.log('Message sent.', 'success');
        }
       })
       .catch(error => {
         console.log(error)
        //  setIsLoading(false);
         console.log('Server side issue!', 'error');
       });
      
      setMessage("");
    } else {
      setMessage("");
    }
  };



  const updateMsgReadStatus = (receiver_id, sender_id) => {
    let payload = {
      "receiver_id": receiver_id,
      "sender_id": sender_id
    };
    console.log('Payload: ', payload);
    postData('/read-status', payload, token).then((res) => {
      console.log(res);        
     })
    .catch(error => {
       console.log(error);        
    });
  }


  const getFriendProfileStatus = (person_id) => {
    let payload = {
      "user_id": person_id
    };
    setIsLoading(true);
    console.log('Payload: ', payload);
    postData('/check-status', payload, token).then((res) => {
      setIsLoading(false);
      console.log(res);       
      if(res.data){
        setPersonStatus(res.data);
      }else{
        setPersonStatus(null);
      }
     })
    .catch(error => {
      setIsLoading(false);
       console.log(error);        
    });
  }






  return (
    <div className="app">
      <TopHeader></TopHeader>

      <main className="content-main">
        <div className="dashboard-content" style={{ display: "block" }}>

          {(personStatus === '1' || personStatus === '4') && (
          <div style={{ width: "90%", margin: "0px auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 100,
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", left: 0 }}>
                <Link to="/bottomTab3">
                  <MdOutlineKeyboardArrowLeft
                    style={{
                      fontSize: 30,
                      color: "#733faa",
                      cursor: "pointer",
                    }}
                  ></MdOutlineKeyboardArrowLeft>
                </Link>
              </div>

          
              <div className="userAvatar-Div" style={{cursor: 'auto'}}>
                <img src={person && person.image} alt="User Avatar" style={{cursor: 'auto'}}/>
              </div>
              <div style={{ marginLeft: 15 }}>
                <h4>{person.name}</h4>
              </div>
            </div>

            <div className="chat">
              {messages?.map((msg, i) => {
                return (
                  <div
                  key={i}
                    className={
                      msg.sender === user.id.toString()
                        ? "message right-message"
                        : "message left-message"
                    }><span>{msg.message}</span>
                  </div>
                );
              })}
              <div ref={lastMessageRef} />
            </div>
            <div className="input-form">
              <form
                onSubmit={sendMsg}
                style={{
                  position: "relative",
                  bottom: 0,
                  width: "100%",
                  // backgroundColor: 'white',
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <div
                  className="input-field"
                  style={{
                    width: "100%",
                    height: 40,
                  }}
                >
                  <input
                    type="value"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "5px 15px",
                    }}
                    multiple={true}
                    aria-multiline={true}
                  />{" "}
                  <button>Send</button>
                </div>
              </form>
            </div>
          </div>
          )}

          {personStatus === '0' && (
                 <div className="no-data-msg">
                 You need to accept the message request, then chating option will be enabled!</div>
          )}

          {personStatus === '2' && (
                 <div className="no-data-msg">
                 You rejected this user message request!</div>
          )}



{/* 0=waiting
1=accept
2=reject */}



        </div>
      </main>
      <BottomTabs />
      {isLoading && <LoaderService />}
    </div>
  );
  
};

export default ChatBetween;
