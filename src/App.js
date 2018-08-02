import React, { Component } from 'react';
import logo from './logo.svg';
import Table from './Components/Table'
// import ScrollBar from './Components/ScrollBar'



class App extends Component {
  render() {
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        children: [
          {
            title: '参与人数',
            dataIndex: 'member',
            key: 'member'
          },
          {
            title: '总计',
            dataIndex: 'total',
            key: 'total'
          },
        ]
      },
    ]

    const rows = ['address', 'age']
    const cols = ['name', 'second name']
    const values = ['total', 'age']
    const data = [
      {
        address: '上海',
        total: 30,
        member: 3,
        sex: '女',
        name: 'lili',
        age: 12,
        'second name': 'kl'
      },
      {
        address: '上海',
        total: 40,
        member: 3,
        sex: '女',
        name: 'lisa',
        age: 12,
        'second name': 'kl'
      },
      {
        address: '北京',
        total: 10,
        member: 1,
        sex: '男',
        name: 'lili',
        age: 15,
        'second name': 'ksasa'
      },
      {
        address: '广州',
        total: 20,
        member: 2,
        sex: '男',
        name: 'lisas',
        age: 19,
        'second name': 'kl'
      },
      {
        address: '杭州',
        total: 40,
        member: 4,
        sex: '男',
        name: 'lili',
        age: 12,
        'second name': 'kl'
      },
    ];
    return (
      <div className="App">

        <Table height={500} data={data} values={values} rows={rows} cols={cols} columns={columns} />
      </div>
    );
  }
}

export default App;
