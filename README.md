# calculator

Simple INTEGER Calculator api application, written in JavaScript for Node.js, with a little help from the express package!

To build and test your own version of the api, please follow the instructions below. Your attention is also drawn to the Asumptions and Limitiations sections.

Minimum version requirements:

- `Node.js` v16.10.0

## Step 1 - Cloning the Project

Start a terminal session (assuming you have git installed) and issue the following command to clone the repo:

`git clone https://github.com/mrtim2117/calculator.git`

To ensure you have the latest code at any point in time, simply navigate to your local project folder containing the above clone, then enter the following command from your terminal session:

`git pull origin main`

## Step 2 - Install Dependencies

From the root of your project folder above, issue the command

`npm install`

This will install development and runtime dependencies:

**Dev (& test) dependencies:**

- `jest`
- `supertest`
- `nodemon`

**Runtime dependencies**

- `express`

## Step 3 - Running the Tests

Navigate to the project root folder (containing the .git directory) and issue the following command:

`npm test`

This will execute (and hopfefully pass) all tests in the **tests** folder; `App.test.js` and `utils.test.js`

## Step 4 - Consuming the API

The api supports a total of five endpoints. To consume the api in development, run the following command from a VS Code terminal session in the project root folder:

`npm run dev`

This begins a Nodemon execution session, where the api will re-start and immediately take account of any changes to source code, once saved. The api listens by default on port 9090. This may be overriden in file `listen.js`

The api may now be interrogated for a list of supported endpoints by issuing the following GET request from a browser or tool such as curl, Postman or Insomnia:

`http://localhost:9090/api`

### Add Endpoint

Example request:

`http://localhost:9090/api/add?addendOne=2&addendTwo=3`

Example response

`{"sum": 5}`

### Subtract Endpoint

Example request:

`http://localhost:9090/api/subtract?subtrahend=5&minuend=12`

Example response:

`{"difference": 7}`

### Multiply Endpoint

Example request:

`http://localhost:9090/api/multiply?multiplicand=10&multiplier=4`

Example response:

{"product": 40}

### Divide Endpoint

Example request:

`http://localhost:9090/api/divide?dividend=8&divisor=2`

Example response:

`{"quotient": 4}`

## Step 5 - Assumptions

The following assumptions were made during the development of this project:

- `All endpoints are to support negative numbers`
- `It's acceptable to omit logging from this initial build`
- `No authentication to the api is required`
- `A production build is still required, where the following concerns require consideration`
  - `instrumentation is added to the code and logging implemented`
  - `process hosting decision eg containerisation, Azure serverless functions etc`
  - `any requirements for implementation of authentication are considered`
  - `scalability approach is required, based on intended usage volumes`
  - `availability or up-time is considered`
  - `real-time monitoring of the application`
  - `crash automatic re-start `
  - `Static code analysis`
  - `Penetration testing`
  - `Overriding the default port setting`

## Step 6 - Limitations

- `Only accepts integers for input operands`
- `Will only ever return an integer result (only the integer part of decimal quotients are returned)`
- `Only 2 operands are accepted to each endpoint; additional query arguments will be ignored and insufficient will generate an http 400`
- `Decimal inputs will will cause an error eg 25.2`
- `Formatted numbers with commas will cause an error eg 1,000,000`
- `All inputs and calculated responses are limited by the maximum size and accuracy of the Node.js (JavaScript) Number data type`
