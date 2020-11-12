const express = require("express");
const connection = require("./database");

router = express.Router();
// add the 3 on top

router.get("/all", (request, response) => {
  
  // in the callback function, use mysql connection to execute select query
  connection.query(`select * from transactions`, (errors, results) => {
    // populate the response object with the results received from mysql server.
    response.send(results);
  });
});

router.post("/add", (request, response) => {

  if (request.body.account_id == null ||
    !Number.isInteger(request.body.account_id)){
    response.send("Invalid Account ID");
    return;
  }
  if (request.body.transaction_id == null ||
    !Number.isInteger(request.body.transaction_id)){
    response.send("Invalid Transaction ID");
    return;
  }
  if (request.body.date == null || request.body.date == ""){
    response.send("Invalid Date");
    return;
  }
  if (request.body.amount == null ||
    !Number.isFinite(request.body.amount)){
    response.send("Invalid Amount");
    return;
  }
  if (request.body.comments == null || request.body.date_created == ""){
    request.body.comments = "No Comments";
    return;
  }
  
    // in the callback function, use mysql connection to execute select query
    connection.query(
      `insert into transactions (account_id, transaction_id, date, amount, comments) values 
      (${request.body.account_id}, ${request.body.transaction_id}, '${request.body.date}', 
      ${request.body.amount}, '${request.body.comments}')`,
      (errors, results) => {
        if (errors){
          console.log(errors);
          response.status(400).send("Server error.");
      } else {
        // Populate the response with a success message
        response.send("Transaction added successfully");
      }
      }
    );
  });

  // URI mapping to display customer with an id specified in the request
  router.get("/id", (request, response) => {
    
    if (request.body.transaction_id == null ||
      !Number.isInteger(request.body.transaction_id)){
      response.send("Invalid Transaction ID");
      return;
    }
    // in the callback function, use mysql connection to execute select query
    connection.query(
      `select * from transactions where transaction_id = ${request.body.transaction_id}`,
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

    if (request.body.account_id == null ||
      !Number.isInteger(request.body.account_id)){
      response.send("Invalid Account ID");
      return;
    }
    if (request.body.transaction_id == null ||
      !Number.isInteger(request.body.transaction_id)){
      response.send("Invalid Transaction ID");
      return;
    }
    if (request.body.date == null || request.body.date == ""){
      response.send("Invalid Date");
      return;
    }
    if (request.body.amount == null ||
      !Number.isFinite(request.body.amount)){
      response.send("Invalid Amount");
      return;
    }
    if (request.body.comments == null || request.body.date_created == ""){
      request.body.comments = "No Comments";
      return;
    }
    
      // in the callback function, use mysql connection to execute select query
      connection.query(
        `update transactions set account_id = ${request.body.account_id}, date = '${request.body.date}', amount = ${request.body.amount},
         comments = '${request.body.comments}' where transaction_id = ${request.body.transaction_id}`,
        (errors, results) => {
          if (errors){
            console.log(errors);
            response.status(400).send("Server error.");
        } else {
          // Populate the response with a success message
          response.send("Transaction updated successfully");
        }
        }
      );
    });

    router.delete("/delete/id", (request, response) => {
    
      if (request.body.transaction_id == null ||
        !Number.isInteger(request.body.transaction_id)){
        response.send("Invalid Transaction ID");
        return;
      }
      // in the callback function, use mysql connection to execute select query
      connection.query(
        `delete from transactions where transaction_id = ${request.body.transaction_id}`,
        (errors, results) => {
            // do this to show errors
            if (errors){
                console.log(errors);
                response.status(400).send("Server error.");
            } else {
          // populate the response object with the results received from mysql server.
          response.send("Transaction deleted successfully");
            }
        }
      );
    });


module.exports = router;
// add this