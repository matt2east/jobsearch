const express = require('express');
var router = express.Router({mergeParams: true});



// // list businesses
// app.get('/students/:studentid?', (req, res)=>{
//     let studentId = req.params.studentid;
//     db.any(`SELECT * FROM students WHERE 1=1 ${studentId ? 'AND student_id = '+studentId : '' }`)
//         .then(function(data) {
//             // success;
//             debug('students data is : ', data);
//             res.json(data);
//         })
//         .catch(function(error) {
//             // error;
//             console.log('Error :', error)
//         });
//   });

module.exports = router;