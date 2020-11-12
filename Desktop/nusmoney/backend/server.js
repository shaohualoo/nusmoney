const express = require("express"); // import express package which will be used to create the backend service
const bodyParser = require("body-parser"); // import body-parser package which is used to parse the body's content from the request
const cors = require("cors");

const userRouter = require("./user");
const accountRouter = require("./account");
const transactionRouter = require("./transaction");
/* remove this for connecting to frontend 
const { application } = require("express");
actually no where the heck did this come from */
// ooooh this line is automatically added but its wrong so just delete
// require the files, if got folder add /folder in front




// create an instance of express which will start the server.
application = express();
application.use(cors())
application.use(bodyParser.json()); // use body parser to specify how to convert body's content.

application.use("/user", userRouter); // tell the application to use mappings from the router object
application.use("/account", accountRouter);
application.use("/transaction", transactionRouter); // tell the application to use mappings from the router object

// tell the thing to use which router

// start the application on port 3000
application.listen(8000, (error) => {
  if (!error) {
    console.log("Application started succesfully");
  }
});
