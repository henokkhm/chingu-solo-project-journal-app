# Chingu Solo Project - Journal App

### Overview

This project was created for the Chingu Voyage 42 pre-work.

LIVE LINK: https://chingu-solo-project-journal-glqum2f99-henokkh.vercel.app/

### Features

This project is a simple CRUD application that allows users to create an account, sign-in and save their own jorunals. Users cannot see other users' journals. Users can edit and update only their own journals.

### Running the project

This app was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To run this application, you should have [`Node.js`](https://nodejs.org/en/download/https://nodejs.org/en/download/) installed on your machine.

After cloning this repo, install the project's dependencies using the following command:

```bash
npm install
```

The app needs a database to store user data. I used a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) database, using the Data API to perform CRUD operations on the Collections. You can use the .env.local.example file to add your own MongoDB database instance credentials before running the application. (Note: Do not forget to rename the file to .env.local)

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Dependencies

Some of the dependencies of the project include:

- uuid to create Session IDs when users sign-in
- bcrypt to hash user's passwords when they sign-up
- cookies to read cookies from incoming requests
- formik to manage form data
- react-masonry-css to create a responsive multi-column cards layout
