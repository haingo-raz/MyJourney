import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Chatbot.scss';
import '../Forms/Form.scss';
import axios from 'axios';
import { chatbotQuestions } from '../../utils/const';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [AImessageHistory, setAIMessageHistory] = useState([]);
  const [isChattingWithAI, setIsChattingWithAI] = useState(false);

  const loggedInUser = useSelector((state) => state.user.email);

  function fetchResponse(newMessageHistory, userMessage) {
    axios
      .post(process.env.REACT_APP_API_URL + '/chat', {
        user_email: loggedInUser,
        user_message: userMessage,
      })
      .then((res) => {
        setMessageHistory([...newMessageHistory, res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
    document.getElementById('userMessage').value = '';
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

  const updateChatStatus = () => {
    setIsChattingWithAI(!isChattingWithAI);
  };

  const chatWithAI = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/chat/ai',
        {
          history: AImessageHistory,
          message: userMessage,
        },
      );
      const data = response.data;
      setAIMessageHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
        {
          role: 'model',
          parts: [{ text: data }],
        },
      ]);
      document.getElementById('userMessage').value = '';
    } catch (error) {
      console.error(error);
    }
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
            <div className="question ai" onClick={updateChatStatus}>
              <p>
                {isChattingWithAI
                  ? 'You are chatting with an AI. Click here to go back to normal chat'
                  : 'Chat with AI ✨'}
              </p>
            </div>
            {!isChattingWithAI &&
              chatbotQuestions.map((question, index) => {
                return (
                  <div className="question" key={index} onClick={addQuestion}>
                    <p>{question}</p>
                  </div>
                );
              })}
          </div>
          <form
            className="chatbot"
            onSubmit={isChattingWithAI ? chatWithAI : updateMessage}
          >
            <div className="chatbot__body">
              {isChattingWithAI
                ? AImessageHistory.map((message, _index) => {
                    return (
                      <div key={_index} className="chatbot__message">
                        <Markdown className="chatbot__message__content">
                          {message.parts[0].text}
                        </Markdown>
                      </div>
                    );
                  })
                : messageHistory.map((message, index) => {
                    return (
                      <div key={index} className="chatbot__message">
                        <p className="chatbot__message__content">{message}</p>
                      </div>
                    );
                  })}
            </div>
            <div className="message_input">
              <input
                type="text"
                id="userMessage"
                name="userMessage"
                onChange={(e) => setUserMessage(e.target.value)}
                required
              />
              <button className="formButton" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
