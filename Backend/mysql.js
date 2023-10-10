// const express = require('express');
// const cors = require('cors')
// const mysql = require('mysql');
// const jwt = require('jsonwebtoken')
// const secretkey = 'secret-key'
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// dotenv.config();

// const app = express();

// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'ADmin#90',
//     database: 'stu_internship'
// });

// app.use(cors())

// app.use(bodyParser.json())

// function generateJWT(user){
//   return jwt.sign({user},secretkey,{expiresIn:"1h"})
// }

// function verifyToken(req,res,next){
//   const token = req.headers['authorization']
//   if(typeof token!== 'undefined'){
//       req.token = token
//       next()
//   }else{
//       res.send({message:'Authentication Required'})
//   }
// }

// //Admin routes
// app.post('/admin',(req,res)=>{
//   const {pass} = req.body
//   pool.query('SELECT * FROM admin WHERE pass = ?', [pass], (error, results) => {
//       if (error) {
//         console.error('Error fetching admin', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } 
//       else if (results.length === 0) {
//         res.status(401).json({error:"Invalid password"})
//       } else {
//         const user = results[0]
//         const token = generateJWT(user)
//         res.status(200).json({message:'Login Successful!',auth:token});
//       }
//   });
// })

// app.get('/adminPage',verifyToken,(req,res)=>{
//   jwt.verify(req.token,secretkey,(err,decoded)=>{
//     if(err){
//         res.status(403).json({error:'Invalid token'})
//     }else{
//         const queries ="SELECT COUNT(*) as total from students;SELECT * from students;";
//         pool.query(queries,(error,results)=>{
//           if(error){
//             console.log(error)
//             res.status(500).json({ error: 'Internal Server Error' })
//           }else if(res.length===0){
//             res.status(200).json({message:'No students found.'})
//           }else{
//             res.status(200).json({message:'Success',results:results})
//           }

//         })
//     }
//   })
// })


// //User routes
// app.post('/',(req,res)=>{
//     const {email,pass} = req.body
//     pool.query('SELECT * FROM students WHERE email = ? AND pass = ?', [email,pass], (error, results) => {
//         if (error) {
//           console.error('Error fetching user by roll:', error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } 
//         else if (results.length === 0) {
//           res.status(401).json({error:"Invalid email or password"})
//         } else {
//           const user = results[0]
//           delete user.pass, delete user.id
//           const token = generateJWT(user)
//           res.status(200).json({message:'Login Successful!',auth:token});
//         }
//     });
// })

// app.post('/signup', (req, res) => {
//     const { roll, name, divi, course, email, pass } = req.body;
//     const user = {roll, name, divi, course, email, pass}
//     pool.query('SELECT * FROM students WHERE roll = ? AND divi = ? AND course = ?', [roll,divi,course], (error, results) => {
//       if (error) {
//         console.log('Error fetching user by roll:');
//         res.status(500).json({ error: 'Internal Server Error' });
//       } 
//       else if(results.length > 0){
//         res.status(409).json({error:'User already exists'});
//       } 
      
//       else {
//         pool.query('INSERT INTO students (name,course,divi,roll,email,pass) VALUES (?, ?, ?, ?,?,?)', 
//         [name,course,divi,roll,email,pass], (error, results) => {
//           if (error) {
//           console.log('Error adding user:');
//           res.status(500).json({ error: 'Internal Server Error' });
//           } else {
//             delete user.pass, delete user.id
//             const token = generateJWT(user)
//             res.status(201).json({ message: 'User added successfully',auth:token });
//           }
//         });
//       }
//     });
//   })

// app.patch('/dashboard/form',verifyToken,(req,res)=>{
//   const {teacher,gender,phn,address} = req.body;
//   jwt.verify(req.token,secretkey,(err,decoded)=>{
//     if(err){
//         res.status(403).json({message:'Invalid token'})
//     }else{
//         pool.query('UPDATE students SET teacher=?,gender=?,phn=?,address=? WHERE roll =? AND divi=? AND course=?', 
//         [teacher,gender,phn,address, decoded.user.roll, decoded.user.divi, decoded.user.course], (error, results) => {
//             if (error) {
//               console.error('Error adding user:', error);
//               res.status(500).json({ error: 'Internal Server Error' });
//             } else {
//               pool.query('SELECT * FROM students WHERE roll = ? AND divi = ? AND course = ?', 
//               [decoded.user.roll, decoded.user.divi, decoded.user.course], (error, results) => {
//                 if (error) {
//                   console.log('Error fetching user by roll:');
//                   res.status(500).json({ error: 'Internal Server Error' });
//                 } 
//                 else if(results.length > 0){
//                   const user = results[0]
//                   delete user.pass, delete user.id
//                   const newToken = generateJWT(user)
//                   res.status(200).json({ message: 'User updated successfully' ,auth:newToken});
//                 }
//               })
//             }
//         });
//     }
//   })
// })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});