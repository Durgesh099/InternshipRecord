import React from 'react'
import jwt_decode from 'jwt-decode'
import './Admin.css'

var studTotal
var studData
const Admin = () =>{

  const token = localStorage.getItem('user')

  const getInfo = async (e) => {
    try {
      const response = await fetch('http://localhost:3000/adminPage', {
          method: 'GET',
          headers: {
            'Content-Type':'application/json',
            Authorization: JSON.parse(token)
          }
      });
      
      const data = await response.json()
      if(response.ok){
          console.log(data.message)
          console.log(data.results)
      }else{
        console.log(data.error)
      }
      
    } catch (error) {
      console.error('Error:', error)
    }
  }
  getInfo()

  const students = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 22 },
    { id: 3, name: 'Charlie', age: 21 },
  ];
  const tableRows = students.map((student) => (
    <tr key={student.id}>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.roll}</td>
    </tr>
  ));


    return(
      <div className='wrapperr'>
          <li><h2>Total Students Registered : {studTotal}</h2></li>
          <li><h2>Student Table</h2></li>
          <li><table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                  {tableRows}
              </tbody>
            </table>
          </li>
      </div>


    )
}

export default Admin