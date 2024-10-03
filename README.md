# About
MyJourney is a web application where users can create, save, and edit their workout journey. Furthermore, they have the option to chat with an AI or ask questions about their journey.

# Features
- Create an account.
- Log in with the created credentials or log out.
- Update their email or password.
- Delete their account.
- Add their profile details such as height, weight, etc.
- Create their own workout routine by adding a YouTube video URL in the form on the fitness page. The title of the video and duration will be automatically filled. Users can still edit the title to their own liking.
- Update an existing workout.
- Delete a workout from the list.
- Ask questions about their workout journey through a chatbot or chat with an AI.

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
![Chat](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/chatPage-sm.png)

## Chat with AI page
![Chat with AI](https://raw.githubusercontent.com/haingo-raz/MyJourney/master/public/UI/chatPageWithAI-sm.png)
