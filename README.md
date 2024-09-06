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
- Azure SQL
- MySQL

# How to run it on your computer

This project requires a [Node.js API](https://github.com/haingo-raz/MyJourney-API) and an Azure SQL (or MySQL) database to work. However, here are the steps to run the frontend on your computer:

1. Clone the project using the command `git clone https://github.com/haingo-raz/MyJourney.git`.

2. Install the required libraries using `npm install`.

3. Set up the environment variable by creating a .env file. Follow the content of the example.env file. The default URL of the [Node.js API](https://github.com/haingo-raz/MyJourney-API) is `http://localhost:8080` when run locally.

4. Run `npm start`.

5. View the app on `localhost:3000` in your browser.

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

# Future work
* Develop a chatbot that can answer basic and customized questions.
* Add a statistics page or perform data analysis.
* Duplicate a past workout history for the current day.
* Add the possibility to reschedule a workout item for the next day.

# Useful ressources
- [Redux persist tutorial](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)