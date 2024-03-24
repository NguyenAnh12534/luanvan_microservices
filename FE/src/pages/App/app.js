// import "./app.css";
// import io from "socket.io-client";
// import { useState } from "react";
// import Chat from "../Chat/chat.js";
// import React from "react";

// const socket = io.connect("http://localhost:4000");

// function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("JavaScript");
//   const [showChat, setShowChat] = useState(false);

//   const joinRoom = (e) => {
//     e.preventDefault();
//     if (username !== "" && room !== "") {
//       socket.emit("join_room", room);
//       setShowChat(true);
//     }
//   };

//   return (
//     <div className="App">
//       {!showChat ? (
//        	<div className="join-container">
//           <header className="join-header">
//             <h1><i className="fas fa-smile"></i> ChatCord</h1>
//           </header>
//           <main className="join-main">
//             <form action="chat">
//               <div className="form-control">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   placeholder="Enter username..."
//                   required
//                   onChange={(event)=> setUsername(event.target.value)}
//                 />
//               </div>
//               <div className="form-control">
//                 <label htmlFor="room">Room</label>
//                 <select name="room" id="room" 
//                   onChange={(event)=>setRoom(event.target.value)}
//                 >
//                   <option value="JavaScript">JavaScript</option>
//                   <option value="Python">Python</option>
//                   <option value="PHP">PHP</option>
//                   <option value="C#">C#</option>
//                   <option value="Ruby">Ruby</option>
//                   <option value="Java">Java</option>
//                 </select>
//               </div>
//               <button type="submit" className="btn" onClick={joinRoom}>Join Chat</button>
//             </form>
//           </main>
//         </div>
//       ) : (
//         <Chat socket={socket} username={username} room={room} />
//       )}
//     </div>
//   );
// }

// export default App;
