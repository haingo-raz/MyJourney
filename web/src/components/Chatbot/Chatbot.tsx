import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import './Chatbot.scss';
import '../Forms/Form.scss';
import axios from 'axios';
import { chatbotQuestions } from '../../utils/const';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';

function Chatbot() {
  const [userMessage, setUserMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [AImessageHistory, setAIMessageHistory] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);
  const [isChattingWithAI, setIsChattingWithAI] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    cooldownTimer.current = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, [cooldown]);

  function startCooldown() {
    setError('Too many requests, please slow down.');
    setCooldown(60);
  }

  const isRateLimited = cooldown > 0;

  const userId = useSelector(
    (state: { user: { userId: number } }) => state.user.userId,
  );

  function fetchResponse(newMessageHistory: string[], userMessage: string) {
    axios
      .post(process.env.REACT_APP_API_URL + '/chat', {
        user_id: userId,
        user_message: userMessage,
      })
      .then((res) => {
        setMessageHistory([...newMessageHistory, res.data]);
      })
      .catch((err) => {
        if (err?.response?.status === 429) startCooldown();
        else
          setError(
            err?.response?.data?.error ||
              'Something went wrong. Please try again.',
          );
      });
    const userMessageInput = document.getElementById(
      'userMessage',
    ) as HTMLInputElement;
    if (userMessageInput) {
      userMessageInput.value = '';
    }
  }

  const updateMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newMessageHistory = [...messageHistory, userMessage];
    setMessageHistory(newMessageHistory);
    fetchResponse(newMessageHistory, userMessage);
  };

  const updateChatStatus = () => {
    setIsChattingWithAI(!isChattingWithAI);
  };

  const chatWithAI = async (e: { preventDefault: () => void }) => {
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
      const userMessageInput = document.getElementById(
        'userMessage',
      ) as HTMLInputElement;
      if (userMessageInput) {
        userMessageInput.value = '';
      }
    } catch (err: any) {
      if (err?.response?.status === 429) startCooldown();
      else
        setError(
          err?.response?.data?.error ||
            'Something went wrong. Please try again.',
        );
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
            <div
              role="button"
              tabIndex={0}
              className="question ai"
              onClick={updateChatStatus}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') updateChatStatus();
              }}
            >
              <p>
                {isChattingWithAI
                  ? 'You are chatting with an AI. Click here to go back to normal chat'
                  : 'Chat with AI ✨'}
              </p>
            </div>
            {!isChattingWithAI &&
              chatbotQuestions.map((question, index) => {
                function handleSelect() {
                  if (isRateLimited) return;
                  setUserMessage(question);
                  const newMessageHistory = [...messageHistory, question];
                  setMessageHistory(newMessageHistory);
                  fetchResponse(newMessageHistory, question);
                }
                return (
                  <div
                    role="button"
                    tabIndex={isRateLimited ? -1 : 0}
                    className={`question${isRateLimited ? ' question--disabled' : ''}`}
                    key={index}
                    onClick={handleSelect}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSelect();
                    }}
                  >
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
            {(error || isRateLimited) && (
              <p className="chatbot__error">
                {isRateLimited
                  ? `Too many requests, please slow down. Try again in ${cooldown}s.`
                  : error}
              </p>
            )}
            <div className="message_input">
              <input
                type="text"
                id="userMessage"
                name="userMessage"
                onChange={(e) => setUserMessage(e.target.value)}
                disabled={isRateLimited}
                required
              />
              <button
                className="formButton"
                type="submit"
                disabled={isRateLimited}
              >
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
