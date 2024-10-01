import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Chatbot.scss";
import "../Forms/Form.scss";
import axios from 'axios';
import { chatbotQuestions } from '../../utils/const';
import { useSelector } from 'react-redux';

function Chatbot(props) {
    const [userMessage, setUserMessage] = React.useState("");
    const [messageHistory, setMessageHistory] = React.useState(["Hello, how can I help you today?"]);

    const loggedInUser = useSelector(state => state.user.email);

    function fetchResponse(newMessageHistory, userMessage) {
        axios.post(process.env.REACT_APP_API_URL + '/chat', { user_email: loggedInUser, user_message: userMessage })
            .then(res => {
                setMessageHistory([...newMessageHistory, res.data]);
            });
        document.getElementById("userMessage").value = "";
    }

    const updateMessage = async (e) => {
        e.preventDefault();
        const newMessageHistory = [...messageHistory, userMessage];
        setMessageHistory(newMessageHistory);
        fetchResponse(newMessageHistory, userMessage);
    };

    const addQuestion = (e) => {
        e.preventDefault();
        const message = e.target.textContent;
        setUserMessage(message);
        const newMessageHistory = [...messageHistory, message];
        setMessageHistory(newMessageHistory);
        fetchResponse(newMessageHistory, message);
    };

    const chatWithAI = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div className="chatbotPage">
                <div className="container">
                    <div className="title">
                        <h1>Ask questions about your workout journey</h1>
                    </div>
                    <div className="questions">
                        {chatbotQuestions.map((question, index) => {
                            return (
                                <div className="question" key={index} onClick={addQuestion}>
                                    <p>{question}</p>
                                </div>
                            );
                        })}
                        <div className="question ai" onClick={chatWithAI}>
                            <p>Chat with AI ✨</p>
                        </div>
                    </div>
                    <form className="chatbot" onSubmit={updateMessage}>
                        <div className="chatbot__body">
                            {messageHistory.map((message, index) => {
                                return (
                                    <div className="chatbot__message" key={index}>
                                        <div className="chatbot__message__content">
                                            <p>{message}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="message_input">
                            <input type="text" id="userMessage" name="userMessage" onChange={(e) => setUserMessage(e.target.value)} required />
                            <button className="formButton" type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Chatbot;
