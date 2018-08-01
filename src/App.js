import React, { Component } from 'react';
import logo from './logo.svg';
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
        dataKey: 'age',
        children: [
          {
            title: 'm',
            key: 'm',
            dataIndex: 'm',
            dataKey: 'sex'
          },
          {
            title: 'w',
            key: 'w',
            dataIndex: 'w',
            dataKey: 'sex'
          }
        ]
      },
      {
        title: '15~18',
        key: '15~18',
        dataIndex: '15~18',
        dataKey: 'age',
      },
      {
        title: '11~14',
        key: '11~14',
        dataIndex: '11~14',
        dataKey: 'age',
      },
    ]

    const data = [
      {
        age: '11~14',
        total: 110,
        counts: 11,
        members: 11,
        sex: 'w'
      },
      {
        age: '1~10',
        total: 10,
        counts: 1,
        members: 1,
        sex: 'm'
      },
      {
        age: '15~18',
        total: 150,
        counts: 15,
        members: 15,
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
