# About
MyJourney is a web application where users can create, save, and edit their workout journey. Furthermore, they have the option to chat with an AI or ask questions about their workout journey.

# Features
Users can :
- Create an account.
- Log in with the created credentials.
- Log out.
- Update their email or password.
- Delete their account.
- Design personalized workout routines by submitting a YouTube video URL in the fitness page form. The video title and duration will be auto-filled with the help of the YouTube API, but users can customize the title as desired.
- Update an existing workout.
- Delete a workout from the list.
- Ask questions about their workout journey through a rule-based chatbot.
- Chat with an AI using GEMINI.

# Technology
## Frontend (this project)
- React.js
- Redux
- SCSS

## Backend
- Node.js/Express
- MySQL (Azure SQL)

# Other
- YouTube API
- Gemini API

# How to run it on your computer

This project requires a [Node.js API](https://github.com/haingo-raz/MyJourney-API) and a MySQL (or Azure SQL) database to work. However, here are the steps to run the frontend on your computer:

1. Clone the project using the command `git clone https://github.com/haingo-raz/MyJourney.git`.

2. Install the project dependencies using `npm install`.

3. Get a YouTube API key to automatically fill entries when creating a workout. Find out how to get your own API [here](https://developers.google.com/youtube/v3/getting-started).

4. Set up the environment variables by creating a .env file. Follow the content of the example.env file. The default URL of the [Node.js API](https://github.com/haingo-raz/MyJourney-API) is `http://localhost:8080` when run locally. Also, add your YouTube API key here.

5. Run `npm start`.

6. View the app on `localhost:3000` in your browser.

7. To ensure code consistency, run `npm run format` after making any changes. This command uses Prettier to format all files within the `src` directory.

# Useful resources
- [Redux persist tutorial](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)
- [Testing with Jest and React Testing Library](https://www.digitalocean.com/community/tutorials/how-to-test-a-react-app-with-jest-and-react-testing-library)

# UI
## Login
![Login](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/loginPage.png)

## Sign up
![Signup](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/signupPage.png)

## Profile page
![Profile](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/profilePage.png)

## Home
![Home](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/homepage.png)

## Workout page
![Fitness](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/fitnessPage.png)

## Workout page mobile view
![Fitness SM](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/fitnessPage-sm.png)

## Chat page (rule-based)
![Chat](https://raw.githubusercontent.com/haingo-raz/MyJourney/refs/heads/master/public/UI/chatPage.png)

## Chat with AI page
![Chat with AI](https://raw.githubusercontent.com/haingo-raz/MyJourney/refs/heads/master/public/UI/chatPageWithAI.png)
