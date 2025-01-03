import React from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import './App.scss';

function App() {
  const isLoggedIn = useSelector((state: { user: { isLoggedIn: boolean } }) => state.user.isLoggedIn);
  const routing = useRoutes(routes(isLoggedIn));

  return <div className="App">{routing}</div>;
}

export default App;
