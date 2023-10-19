import React from 'react'
import jwt_decode from 'jwt-decode'
import './Admin.css'

var studTotal
var studData
const Admin = () =>{


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
              </tbody>
            </table>
          </li>
      </div>


    )
}

export default Admin