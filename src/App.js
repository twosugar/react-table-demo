import { useState } from 'react';
import Menu from './components/Menu';
import Table from './components/Table'
import Modal from './components/Modal';
import './App.scss'

const defaultData = [
  {
    id: 1,
    ClientName: "dev",
    BoardName: "supports",
    Tags: ["fish", "nihao"],
    Requestor: "ty",
  },
  {
    id: 2,
    ClientName: "Worker Training",
    BoardName: "Admin Supports",
    Tags: ["Story", "xx"],
    Requestor: "Kleven YU",
  },
  {
    id: 3,
    ClientName: "Order",
    BoardName: "Elsa LI",
    Tags: ["CES"],
    Requestor: "Elsa",
  },
];

function App() {
  const list = JSON.parse(localStorage.getItem("searchtable"))
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({})
  const [dataSource, setDataSource] = useState(list && Array.isArray(list) ? list : defaultData);

  return (
    <div className="App">
      <div className='container'>
        <Menu />
        <Table setIsModalOpen={setIsModalOpen} setModalInfo={setModalInfo} dataSource={dataSource} setDataSource={setDataSource} />
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalInfo={modalInfo} setModalInfo={setModalInfo} setDataSource={setDataSource} dataSource={dataSource} />
      </div>
    </div>
  );
}

export default App;
