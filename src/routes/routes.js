import { Navigate } from 'react-router-dom';
import Account from './../pages/Account/Account';
import LoginForm from './../components/Forms/LoginForm';
import SignUpForm from './../components/Forms/SignUpForm';
import Home from './../pages/Home/Home';
import Fitness from './../pages/Fitness/Fitness';
import Profile from './../pages/Profile/Profile';
import Chatbot from './../components/Chatbot/Chatbot';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <Home /> : <Account component={<LoginForm />} />,
  },
  {
    path: '/signup',
    element: isLoggedIn ? <Home /> : <Account component={<SignUpForm />} />,
  },
  {
    path: '/home',
    element: isLoggedIn ? <Home /> : <Navigate to="/" />,
  },
  {
    path: '/fitness',
    element: isLoggedIn ? <Fitness /> : <Navigate to="/" />,
  },
  {
    path: '/chat',
    element: isLoggedIn ? <Chatbot /> : <Navigate to="/" />,
  },
  {
    path: '/profile',
    element: isLoggedIn ? <Profile /> : <Navigate to="/" />,
  },
  {
    path: '*',
    element: isLoggedIn ? <Home /> : <Navigate to="/" />,
  },
];

export default routes;
