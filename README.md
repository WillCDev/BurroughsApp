# Burroughs App

A fullstack typescript application designed to fulfil the Burroughs tech test. Requirements of the tests are:

```
Create an API to help a small fictional company calculate the dates on which they should pay their sales staff.  Company payroll is handled like so:

- Sales staff are paid a regular fixed base salary each month, plus a regular monthly bonus

- Base salaries are paid on the last day of each month, unless that day is a Saturday or Sunday (a weekend), in which case they are paid on the Friday before the weekend.

- On the 15th of each month, bonuses are paid for the previous month, unless that day is a weekend, in which case they are paid on the first Wednesday after the 15th.
```


## Prerequisites
```text
node ^14.17.0
npm ^6.0.0
```

## Installation
```bash
git clone https://github.com/WillCDev/BurroughsApp.git
cd ./BurroughsApp
npm i
```
      

## Run App Locally
To run the Sever and Webapp concurrently locally
```bash
npm run dev
```
Server will be available on http://localhost:8080   
App will be available on http://localhost:9003   

**NOTE: Both will be running in watch mode and will automatically reload when files are changed to enable continuous development.**


## Run All Tests
To run all tests, for both the server and webapp
```bash
npm run test
```


## Server specific commands
`npm run start` - build he server and run it   
`npm run serve` - serve the built app locally from ./server/dist   
`npm run server:build` - build the server and deploy it to ./server/dist  
`npm run server:dev` - build and run the server in watch mode using `nodemon` for development   
`npm run server:lint` - run eslint and prettier checks against all server code   
`npm run server:type-check` - run type checks using `tsc` against all server code   
`npm run server:test` - run linting, typechecks, and all automated tests against the server code   
`npm run server:test:dev` - run automated jest tests in `watch mode` to develop server tests locally


## App specific commands
`npm run app:build` - build the app for production and deploy it to ./app/dist  
`npm run app:dev` - build and run the app locally in watch mode using `nodemon` for development   
`npm run app:lint` - run eslint and prettier checks against all app code   
`npm run app:type-check` - run type checks using `tsc` against all app code   
`npm run app:test` - run linting, typechecks, and all automated tests against the app code   
`npm run app:test:dev` - run automated jest tests in `watch mode` to develop app tests locally


## CI / CD
CI Pipeline is provided using Github Workflows   

[server-ci](.github/workflows/server-ci.yml ) - Run when a new PR contains changes to the `./server/**` directory, and will run all linting, type-checks and automated tests against the server before allowing the PR to be merged   

[app-ci](.github/workflows/server-ci.yml ) - Run when a new PR contains changes to the `./app/**` directory, and will run all linting, type-checks and automated tests against the app before allowing the PR to be merged


## Still left to do
This is only a first pass, so there is still plenty of room for improvement.
To see all todo's in code, you can use an IDE plugin such as [ToDo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)   
Generally these are outstanding:
- Write a lot more tests, both server and app
- Tidy up code
- Add https support to both server and app
- Add error handling to both server and app
- Update server configuration to make it deployable to a production environment
- Sync up the animations and soundFX in the app
- Add naming to the CSV file returned from the server
- Add timezone support, everything runs in UTC atm
