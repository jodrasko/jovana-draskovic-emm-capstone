# eMM | electronic Medical Management

An electronic medical management web application that allows
users to store their medical information, keep track of their
medications, physicians, and consult notes.

## Tech Stack

**Client:** React, Axios, BEM/SASS

**Server:** Node, Express

**Language:** HTML5, JavaScript

**Tools:** VSCode IDE, npm

## Features

- Responsive Design
- Error Handling
- HTML5 Built-In Form Validation
- Password Encryption
- User Authorization and Authentication

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file for the client and server

`REACT_APP_API_URL`

`PORT`

`CLIENT_URL`

`JSON_SECRET_KEY`

## Installation

Open a new terminal.

In the project directory, run:

### `cd server`

In the server directory, run:

### `npm install`

To start server run:

### `npm start`

Open a second terminal for the client.

In the server directory, you need to run:

### 'cd ..'

To get to the project directory.

To change directory to client run:

### `cd client`

In the client directory run:

### `npm install`

To start client run:

### `npm start`

A browser tab will open [http://localhost:3000](http://localhost:3000) with the eMM web application running.

## Lessons Learned

I learned:

- how to use JSON Web Tokens (JWT) for authorization
- how to encrypt a password using npm bcrypt
- how to add authorization to every backend API
- how to build a styled, multi-page web application from scratch by applying concepts like Flexbox and SASS to build static webpages
- mastered HTML5, CSS and JavaScript while building dynamic web applications
- mastered Node/Express routers
- mastered ReactJS library
- how to use Git and Github
- to keep myself on task and organized with such a big project

A challenge I faced was to implement error handling. I overcome it by creating a
custom error object with error messages on server-side to display them on the client-side. In particular, this helped me with
displaying error message when a user tries to sign up with a username that was already defined in the system and
to display login errors

## Next Steps

- Phase 2: Implement data storage using MongoDB
- Phase 3: Design additional functionalities to help the user schedule medication, its dosage, duration, daily reminders as well as sharing information with the caregiver/family members

## Authors

- [Jovana Draskovic](https://github.com/jodrasko)
