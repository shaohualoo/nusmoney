const express = require("express");
const connection = require("./database");
// double .. if file you require is in one directory above like outside this folder

router = express.Router();
// add the 3 on top

router.get("/all", (request, response) => {
  
  // in the callback function, use mysql connection to execute select query
  connection.query(`select * from accounts`, (errors, results) => {
    // populate the response object with the results received from mysql server.
    response.send(results);
  });
});

router.post("/add", (request, response) => {

  if (request.body.user_id == null ||
    !Number.isInteger(request.body.user_id)){
    response.send("Invalid User ID");
    return;
  }
  if (request.body.account_id == null ||
    !Number.isInteger(request.body.account_id)){
    response.send("Invalid Account ID");
    return;
  }
  if (request.body.account_type == null || request.body.account_type == ""){
    response.send("Invalid Account Type");
    return;
  }
  if (request.body.balance == null ||
    !Number.isFinite(request.body.balance)){
    response.send("Invalid Balance");
    return;
  }
  if (request.body.max_limit == null ||
    !Number.isInteger(request.body.max_limit)){
    response.send("Invalid Max Limit");
    return;
  }
  if (request.body.date_created == null || request.body.date_created == ""){
    response.send("Invalid Date Created");
    return;
  }
  
    // in the callback function, use mysql connection to execute select query
    connection.query(
      `insert into accounts (user_id, account_id, account_type, balance, max_limit, date_created) values 
      (${request.body.user_id}, ${request.body.account_id}, '${request.body.account_type}', 
      ${request.body.balance}, ${request.body.max_limit}, '${request.body.date_created}')`,
      (errors, results) => {
        if (errors){
          console.log(errors);
          response.status(400).send("Server error.");
      } else {
        // Populate the response with a success message
        response.send("Account added successfully");
      }
      }
    );
  });

  // URI mapping to display customer with an id specified in the request
  router.get("/id", (request, response) => {
    
    if (request.body.account_id == null ||
      !Number.isInteger(request.body.account_id)){
      response.send("Invalid Account ID");
      return;
    }
    // in the callback function, use mysql connection to execute select query
    connection.query(
      `select * from accounts where account_id = ${request.body.account_id}`,
      (errors, results) => {
          // do this to show errors
          if (errors){
              console.log(errors);
              response.status(400).send("Server error.");
          } else {
        // populate the response object with the results received from mysql server.
        response.send(results);
          }
      }
    );
  });


  router.put("/update", (request, response) => {

    if (request.body.user_id == null ||
      !Number.isInteger(request.body.user_id)){
      response.send("Invalid User ID");
      return;
    }
    if (request.body.account_id == null ||
      !Number.isInteger(request.body.account_id)){
      response.send("Invalid Account ID");
      return;
    }
    if (request.body.account_type == null || request.body.account_type == ""){
      response.send("Invalid Account Type");
      return;
    }
    if (request.body.balance == null ||
      !Number.isFinite(request.body.balance)){
      response.send("Invalid Balance");
      return;
    }
    if (request.body.max_limit == null ||
      !Number.isInteger(request.body.max_limit)){
      response.send("Invalid Max Limit");
      return;
    }
    if (request.body.date_created == null || request.body.date_created == ""){
      response.send("Invalid Date Created");
      return;
    }
    
      // in the callback function, use mysql connection to execute select query
      connection.query(
        `update accounts set user_id = ${request.body.user_id}, account_type = '${request.body.account_type}', balance = ${request.body.balance},
         max_limit = ${request.body.max_limit}, date_created = '${request.body.date_created}' where account_id = ${request.body.account_id}`,
        (errors, results) => {
          if (errors){
            console.log(errors);
            response.status(400).send("Server error.");
        } else {
          // Populate the response with a success message
          response.send("Account updated successfully");
        }
        }
      );
    });

    router.delete("/delete/id", (request, response) => {
    
      if (request.body.account_id == null ||
        !Number.isInteger(request.body.account_id)){
        response.send("Invalid Account ID");
        return;
      }
      // in the callback function, use mysql connection to execute select query
      connection.query(
        `delete from accounts where account_id = ${request.body.account_id}`,
        (errors, results) => {
            // do this to show errors
            if (errors){
                console.log(errors);
                response.status(400).send("Server error.");
            } else {
          // populate the response object with the results received from mysql server.
          response.send("Account deleted successfully");
            }
        }
      );
    });
  

module.exports = router;
// add this