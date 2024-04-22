import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import Status from './Status';
import './App.css';

function App() {
  let [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/view');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [value, setValue] = useState()
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(value);
    axios.post(`http://localhost:5000/add`, value).then(result => {
      console.log("Data Added successfully")
      fetchData();
    }).catch(err => console.log(err))
  }


  const deleteData = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/delete?q=${id}`);    //Postgres
      await axios.delete(`http://localhost:5000/delete?id=${id}`);  //MongoDB
      console.log('Data deleted successfully.');
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit1 = async (event) => {
    event.preventDefault()
    console.log(selectedId, status);
    try {
      // await axios.put(`http://localhost:5000/update?s=${selectedId}`, { status: status });   //Postgres
      await axios.put(`http://localhost:5000/update?id=${selectedId}`, { status: status });  //MongoDB
      console.log('Data updated successfully.');
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  const handleSelectId = (id) => {
    setSelectedId(id);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <body>
        <div>
          <div className='p-2 d-flex justify-content-center shadow' style={{ background: 'white' }} >
            <h2>Todo List </h2>
          </div>
          <div style={{ padding: '3rem' }}>
            <div className='shadow  ' style={{ padding: '1rem', background: 'white' }}>
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">Add Task</button>
              <div style={{ padding: '1rem' }}>
                <table className="table border" style={{ fontFamily: 'Arial', fontSize: '' }}>
                  <thead style={{ fontWeight: 'bold' }}>
                    <tr>
                      <th scope="col"><h6>S No.</h6></th>
                      <th scope="col" style={{ width: '200px' }}><h6>Task Description</h6></th>
                      <th scope="col"><h6>Created</h6></th>
                      <th scope="col"><h6>Current status</h6></th>
                      <th scope="col"><h6>Last date</h6></th>
                      <th scope="col"><h6>Remaining</h6></th>
                      <th scope="col"><h6>Last update</h6></th>
                      <th scope="col"><h6>Delete</h6></th>
                      <th scope="col"><h6>Update</h6></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} style={{ fontSize: '0.90rem' }}>
                        <td><h6>{index + 1}.</h6></td>
                        <td ><h6>{item.task}</h6></td>
                        <td>{formatDate(item.comp_date)}</td>
                        <td><Status colour={item.status} /></td>
                        <td>{formatDate(item.due_date)}</td>
                        <td><h7>{item.rem_date} day to go</h7></td>
                        {/* <td><button type="button" className="btn btn-danger " onClick={() => deleteData(item.task_id)}><FontAwesomeIcon icon={faTrash} /></button> </td> */}
                        <td ><h7>{formatDate(item.current_date)} <span className="badge badge-secondary">{item.status}</span></h7></td>
                        <td><button type="button" className="btn btn-danger " onClick={() => deleteData(item._id)} ><FontAwesomeIcon icon={faTrash} /></button> </td>
                        <td>
                          <form onSubmit={handleSubmit1}>
                            <div className='d-flex'>
                              <select
                                className="form-select me-2 small-select"
                                aria-label="Default select example"
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option>{item.status}</option>
                                <option>Progress</option>
                                <option>Completed</option>
                              </select>
                              {/* <button type="submit" className="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-sm" onClick={() => handleSelectId(item.task_id)}> */}
                              <button type="submit" className="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-sm" onClick={() => handleSelectId(item._id)}>
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="myModal">
          <form onSubmit={handleSubmit}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Task</h4>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="comment">Note</label>
                  <textarea className="form-control" rows="5" id="comment" name="text" onChange={(e) => setValue({ ...value, task: e.target.value })} placeholder="Write here..."></textarea>
                </div>
                <div className="modal-body">
                  <label htmlFor="dueDate">Due date</label>
                  <input type="date" className="form-control" id="dueDate" name="dueDate" onChange={(e) => setValue({ ...value, due_date: e.target.value })} placeholder="Select a due date"></input>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal">SAVE</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </body>
    </>
  );
}

export default App;
