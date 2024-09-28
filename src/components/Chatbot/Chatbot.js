import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Chatbot.scss";
import "../Forms/Form.scss";
import axios from 'axios';

function Chatbot(props) {
    const [userMessage, setUserMessage] = React.useState("");
    const [messageHistory, setMessageHistory] = React.useState(["Hello, how can I help you today?"]);
    const questions = [
        "What is the best workout for me?",
        "How many times should I workout in a week?",
    ];

    function fetchResponse(newMessageHistory) {
        axios.post(process.env.REACT_APP_API_URL + '/chat', { userMessage })
            .then(res => {
                setMessageHistory([...newMessageHistory, res.data]);
            });
        document.getElementById("userMessage").value = "";
    }

    const updateMessage = async (e) => {
        e.preventDefault();
        const newMessageHistory = [...messageHistory, userMessage];
        setMessageHistory(newMessageHistory);
        fetchResponse(newMessageHistory);
    };

    const addQuestion = (e) => {
        e.preventDefault();
        const newMessageHistory = [...messageHistory, e.target.textContent];
        setMessageHistory(newMessageHistory);
        setUserMessage(e.target.textContent);
        fetchResponse(newMessageHistory);
    };

    return (
        <>
            <Navbar />
            <div className="chatbotPage">
                <div className="container">
                    <div className="title">
                        <h1>Ask questions about your workout journey</h1>
                    </div>
                    <div className="questions">
                        {questions.map((question, index) => {
                            return (
                                <div className="question" key={index} onClick={addQuestion}>
                                    <p>{question}</p>
                                </div>
                            );
                        })}
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
