/* Demo for FinTech@SG Course 
Generation of Charts Based on JSON data from Server
Author: Prof Bhojan Anand */
//Install d3.js:   npm install d3 --save
import React from "react";
import logo from "./finallogo.jpeg";
import * as d3 from 'd3' 

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      accountsData: [],
      usersData: [],
      transactionsData: []
    };
  }

  

  callAPIServerAccounts() {
    // when button clicked, start a GET request
    // to specified URL
    fetch("http://localhost:8000/account/all")
      .then(res => res.text())
      .then(res => this.setState({ accountsData: JSON.parse(res) }))
      .catch(err => err);

    }

  callAPIServerUsers() {
      // when button clicked, start a GET request
      // to specified URL
      fetch("http://localhost:8000/user/all")
       .then(response => response.json())
       .then(usersData => this.setState({ usersData }))
       .catch(err => err);
  
      }

    callAPIServerTransactions() {
        // when button clicked, start a GET request
        // to specified URL
        fetch("http://localhost:8000/transaction/all")
          .then(res => res.text())
          .then(res => this.setState({ transactionsData: JSON.parse(res) }))
          .catch(err => err);
    
        }
  
  accountsButton() {
    this.callAPIServerAccounts();
  }
    

  usersButton() {
    this.callAPIServerUsers();
  }

  transactionsButton() {
    this.callAPIServerTransactions();

 
  }
 
  componentDidUpdate(prevProps, prevState) {
  //when data received run this
    /* prepare data */
  
  /*
    this.state.accountsData.forEach(function (d) {
      d.balance = d.balance.replace(/[^0-9.-]+/g,"");  //regular expression to convert currency to Numeric form
     
    });
  
    // this.showChartAccounts();  //improved version way to chart
      
  
  
  
    this.state.transactionsData.forEach(function (d) {
      d.amount = d.amount.replace(/[^0-9.]+/g,"");  //regular expression to convert currency to Numeric form
    });
   // this.showChartTransactions();
  */
  

  }



  showChartAccounts() {

  
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    svg.selectAll("*").remove();
  
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
  
    x.domain(this.state.accountsData.map(details => details.account_id));
    y.domain([0, 2200]);
  
  
  
    svg.selectAll(".bar")
      .data(this.state.accountsData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.account_id))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d => y(d.balance))
      .attr("height", d => height - y(d.balance));
  
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
  
    svg.append("g")
      .call(d3.axisLeft(y));
  }

  showChartTransactions() {

    this.state.transactionsData.forEach(function(obj) {
      obj.amount = parseInt(obj.amount); 
    });
    var transactionsDataSummed = this.state.transactionsData.reduce((accumulator, cur) => {
      let account_id = cur.account_id;
      let found = accumulator.find(elem => elem.account_id === account_id)
      if (found) found.amount += cur.amount;
      else accumulator.push(cur);
      return accumulator;
    }, []);

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barChart2")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    svg.selectAll("*").remove();
  
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
  
    x.domain(transactionsDataSummed.map(details => details.account_id));
    y.domain([0, 8000]);
  
  
  
    svg.selectAll(".bar")
      .data(transactionsDataSummed)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.account_id))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d => y(d.amount))
      .attr("height", d => height - y(d.amount));
  
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
  
    svg.append("g")
      .call(d3.axisLeft(y));
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NUSmoney App by Anuflora Bank</h1>
          <br/>
          <button
            className=".btn"
            onClick={() => this.accountsButton()}
          >
            Get Accounts Data
          </button>
          <br/>
          <button
            className=".btn"
            onClick={() => this.usersButton()}
          >
            Get Users Data
          </button>
          <br/>
          <button
            className=".btn"
            onClick={() => this.transactionsButton()}
          >
            Get Transactions Data
          </button>

        </header>

        
        <table className="myTable">
          <tbody>
          {this.state.accountsData.map((item) => {
            return (
              <tr key={item.account_id}>
                <td> {item.user_id} </td>
                <td> {item.account_type} </td>
                <td> {item.balance} </td>
                <td> {item.max_limit} </td>
                <td> {item.date_created} </td>
              </tr>
            );
          })}
          </tbody>
        </table>

        <table className="myTable">
                <tbody>
                    {(this.state.usersData).map( (item) => {
                    return (
                      <tr key={item.user_id}>         
                            <td> {item.user_name} </td>
                            <td> {item.email} </td>
                            <td> {item.mobilenumber}  </td>
                            <td> {item.password} </td>
                            <td> {item.ic_number} </td>
                      </tr>
                      )}
                    )}
                    </tbody>
                </table>

                <table className="myTable">
                <tbody>
                    {(this.state.transactionsData).map( (item) => {
                    return (
                      <tr key={item.transaction_id}>         
                            <td> {item.account_id} </td>
                            <td> {item.date} </td>
                            <td> {item.amount}  </td>
                            <td> {item.comments} </td>
                      </tr>
                      )}
                    )}
                    </tbody>
                </table>
        

        <h2> Visualisation of Data</h2>
         
         <button
            className=".btn"
            onClick={() => this.showChartAccounts()}
          > 
         click
          </button>

          <button
            className=".btn"
            onClick={() => this.showChartTransactions()}
          > 
         click
          </button>

          <div>
            <svg id="barChart"></svg>
          
            <div>
            <svg id="barChart2"></svg>
          </div>
      </div></div>
    );
  }
}

export default App;
