# About
MyJourney is a web application where users can:
- Create an account.
- Log in with the created credentials or log out.
- Create their own workout routine by adding a title, YouTube video URL, and duration into a form.
- Update an existing workout.
- Delete a workout from the list.

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