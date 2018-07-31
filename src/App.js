import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import Table from './Components/Table'
// import ScrollBar from './Components/ScrollBar'



class App extends Component {
  render() {
    const columns = [
      {
        title: '总计',
        key: 'total',
        dataIndex: 'total'
      },
      {
        title: '成员数',
        key: 'members',
        dataIndex: 'members'
      },
      {
        title: '个数',
        key: 'counts',
        dataIndex: 'counts'
      }
    ];

    const rows = [
      // {
      //   key: 'age',
      //   dataKey: 'age'
      // }
      {
        title: '1~10',
        key: '1~10',
        dataIndex: '1~10',
        children: [
          {
            title: 'm',
            key: 'm',
            dataIndex: 'm',
          },
          {
            title: 'w',
            key: 'w',
            dataIndex: 'w',
          }
        ]
      },
      {
        title: '11~14',
        key: '11~14',
        dataIndex: '11~14'
      },
      {
        title: '15~18',
        key: '15~18',
        dataIndex: '15~18'
      }
    ]

    const data = [
      {
        age: '1~10',
        total: 120,
        counts: 3,
        members: 2,
        sex: 'm'
      },
      {
        age: '11~14',
        total: 100,
        counts: 8,
        members: 2,
        sex: 'w'
      },
      {
        age: '15~18',
        total: 100,
        counts: 3,
        members: 4,
        sex: 'w'
      }
    ];
    return (
      <div className="App">

        <Table data={data} rows={rows} columns={columns} />
      </div>
    );
  }
}

export default App;
