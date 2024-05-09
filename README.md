# USERS MANAGEMENT

Authentication

Login
Logout
Register

## Folder Structure

Simple folder structure for Backend and Frontend:
```
BackEndGestionUsuarios
├── node_modules
├── FrontendGU
│   ├── Frontend
│   
└── src
    ├── controllers
    ├── libs
    ├── middlewares
    ├── models
    ├── routes
    ├── schemas    
    └── app.js
    └── config.js
    └── db.js
├── .gitignore
├── index.js
├── package.json
├── README.md

```
```
FrontendGU
├── node_modules
├── public
│   ├── favicon.svg
│   └── robots.txt
└── src
    ├── api
    ├── assets
    ├── components
    ├── context
    ├── pages
    ├── schemas
    └── logo.svg
    └── setupTests.js
    └── App.css
    └── App.jsx
    └── routes.jsx
    └── App.test.jsx
    └── config.js
    └── index.css
    └── index.jsx
    └── reportWebVitals.js
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Development

Install dependencies for both ends by creating two separate terminal instances:

```
npm i
```
Update Submodule that contains frontend configuration:
```
git submodule init
git submodule update
```
Use it on your own project:
```
git clone URL
rm -rf .git && git init  //Delete initial Git repository link and create a new empty Git repository ready to be linked.

```

#### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                             |
| ------------- | ------------------------------------------------------- |
| npm run dev   | nodemon --env-file .env index.js                        |


## Credits

https://github.com/fazt


