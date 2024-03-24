import React, { useEffect, useState, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [userList, setUserList] = useState([username]);
    const inputRef = useRef("");
    const sendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage !== '') {
            await socket.emit('user-send-message', currentMessage);
            inputRef.current.value = ""
            console.log(currentMessage)
        }
    };

    const leaveRoom = function () {
        const check = window.confirm('Are you sure you want to leave the chatroom?');
        if (check) {
            window.location = '/';
        } else {
        }
    };

    useEffect(() => {
        socket.emit('user-join-room', { username, room });
        socket.on('server-update-user', ({ room, users }) => {
            const newUserList = users.map((element) => element.username);
            setUserList(newUserList);
        });
    }, []);

    useEffect(() => {
        socket.on('server-send-message', (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div>
            <div className="chat-container">
                <header className="chat-header">
                    <h1>
                        <i className="fas fa-smile"></i> ChatCord
                    </h1>
                    <a id="leave-btn" className="btn" onClick={leaveRoom}>
                        Leave Room
                    </a>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">
                        <h3>
                            <i className="fas fa-comments"></i> Room Name:
                        </h3>
                        <h2 id="room-name">{room}</h2>
                        <h3>
                            <i className="fas fa-users"></i> Users
                        </h3>
                        <ul id="users">
                            {userList.map((user, index) => {
                                return <li key={index}>{user}</li>;
                            })}
                        </ul>
                    </div>
                    <div className="chat-messages">
                        <ScrollToBottom style={{display:'flex'}}>
                            {messageList.map((messageContent, index) => {
                                return (
                                    <div 
                                        className="wrapper-massage" 
                                        key={index}  
                                        id={username === messageContent.username ? 'you' : 'other'} 
                                    >
                                        <div className="message">
                                            <p className="meta">
                                                {messageContent.username}
                                                <span> {messageContent.time}</span>
                                            </p>
                                            <p className="text">{messageContent.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </ScrollToBottom>
                    </div>
                </main>
                <div className="chat-form-container">
                    <form id="chat-form">
                        <input
                            id="msg"
                            ref={inputRef}
                            type="text"
                            placeholder="Enter Message"
                            required
                            autoComplete="off"
                            onChange={(e) => {
                                setCurrentMessage(e.target.value);
                            }}
                        />
                        <button className="btn" onClick={sendMessage}>
                            <i className="fas fa-paper-plane"></i> Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
