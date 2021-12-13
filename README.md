# calculator

Simple INTEGER Calculator api application, written in JavaScript for Node.js, with a little help from the express package!

To build and test your own version of the api, please follow the instructions below. Your attention is also drawn to the Asumptions and Limitiations sections.

Minimum version requirements:

- `Node.js` v16.10.0

## Step 1 - Cloning the Project

Start a terminal session (assuming you have git installed) and issue the following command to clone the repo:

git clone https://github.com/mrtim2117/calculator.git

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

aThis will execute (and hopfefully pass) all tests in the **tests** folder; `pp.test.js` and `utils.test.js`

## Step 4 - Consuming the API

The api supports a total of five endpoints. To consume the api in development, run the following command from VS Code:

`npm run dev`

This begins a Nodemon execution session, where the api will re-start and immediately take account of any changes to source code, once saved. The api listens by default on port 9090. This may be overriden in file `listen.js`

The api may now be interrogated for a list of supported endpoints by issuing the following GET request from a browser or tool such as curl, Postman or Insomnia:

`http://localhost:9090/api`

### Add Endpoint

Example request

Example response

## Step 5 - Assumptions

## Step 6 - Limitations
