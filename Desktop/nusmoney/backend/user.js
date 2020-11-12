const express = require("express");
const connection = require("./database");
// double .. if file you require is in one directory above like outside this folder

router = express.Router();
// add the 3 on top

router.get("/all", (request, response) => {
  
      // in the callback function, use mysql connection to execute select query
      connection.query(`select * from users`, (errors, results) => {
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
  if (request.body.user_name == null || request.body.user_name == ""){
    response.send("Invalid Username");
    return;
  }
  if (request.body.email == null || request.body.email == ""){
    response.send("Invalid Email");
    return;
  }
  if (request.body.mobilenumber == null || request.body.mobilenumber == ""){
    response.send("Invalid Mobile Number");
    return;
  }
  if (request.body.password == null || request.body.password == ""){
    response.send("Invalid Password");
    return;
  }
  if (request.body.ic_number == null || request.body.ic_number == ""){
    response.send("Invalid IC Number");
    return;
  }
  
    // in the callback function, use mysql connection to execute select query
    connection.query(
      `insert into users (user_id, user_name, email, mobilenumber, password, ic_number) values 
      (${request.body.user_id}, '${request.body.user_name}', '${request.body.email}', 
      '${request.body.mobilenumber}', '${request.body.password}', '${request.body.ic_number}')`,
      (errors, results) => {
        if (errors){
          console.log(errors);
          response.status(400).send("Server error.");
      } else {
        // Populate the response with a success message
        response.send("User added successfully");
      }
      }
    );
  });

  // URI mapping to display customer with an id specified in the request
  router.get("/id", (request, response) => {
    
    if (request.body.user_id == null ||
      !Number.isInteger(request.body.user_id)){
      response.send("Invalid User ID");
      return;
    }
    // in the callback function, use mysql connection to execute select query
    connection.query(
      `select * from users where user_id = ${request.body.user_id}`,
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
    if (request.body.user_name == null || request.body.user_name == ""){
      response.send("Invalid Username");
      return;
    }
    if (request.body.email == null || request.body.email == ""){
      response.send("Invalid Email");
      return;
    }
    if (request.body.mobilenumber == null || request.body.mobilenumber == ""){
      response.send("Invalid Mobile Number");
      return;
    }
    if (request.body.password == null || request.body.password == ""){
      response.send("Invalid Password");
      return;
    }
    if (request.body.ic_number == null || request.body.ic_number == ""){
      response.send("Invalid IC Number");
      return;
    }
    
      // in the callback function, use mysql connection to execute select query
      connection.query(
        `update users set user_name = '${request.body.user_name}', email = '${request.body.email}', mobilenumber = '${request.body.mobilenumber}',
         password = '${request.body.password}', ic_number = '${request.body.ic_number}' where user_id = ${request.body.user_id}`,
        (errors, results) => {
          if (errors){
            console.log(errors);
            response.status(400).send("Server error.");
        } else {
          // Populate the response with a success message
          response.send("User updated successfully");
        }
        }
      );
    });

    router.delete("/delete/id", (request, response) => {
    
      if (request.body.user_id == null ||
        !Number.isInteger(request.body.user_id)){
        response.send("Invalid User ID");
        return;
      }
      // in the callback function, use mysql connection to execute select query
      connection.query(
        `delete from users where user_id = ${request.body.user_id}`,
        (errors, results) => {
            // do this to show errors
            if (errors){
                console.log(errors);
                response.status(400).send("Server error.");
            } else {
          // populate the response object with the results received from mysql server.
          response.send("User deleted successfully");
            }
        }
      );
    });

module.exports = router;
// add this