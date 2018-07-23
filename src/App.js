import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Components/Table'
// import ScrollBar from './Components/ScrollBar'



class App extends Component {
  render() {
    let columns = [], data = []
    for (let i = 1; i <= 10; i++) {
      columns.push({
        title: 'title' + i,
        dataIndex: 'title' + i,
        key: i,
        width: 100
      })
    }

    for (let i = 1; i <= 100; i++) {
      let obj = {}
      columns.forEach(column => {
        obj[column.dataIndex] = 'data' + i
      })

      data.push(obj)
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Table data={data} columns={columns} />
      </div>
    );
  }
}

export default App;
