const express = require('express');
// var router = express.Router({mergeParams: true});
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// pg-promise is one of the libraries used to connect to postgres
const pg = require('pg-promise')();
const port = process.env.PORT || 3005;
const debug = require('debug')('app');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// connection details for pg db in AWS
const cn = {
  host: 'pgdb.accsoftwarebootcamp.com',
  port: 5432,
  database: 'internship',
  user: 'internship',
  password: 'accrocks',
  idleTimeoutMillis: 15000
};
// create an instance of the db connection
const db = pg(cn);

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

// test if the root of your api works
app.get('/', (req, res)=>{
  res.send('You reached the ACC Internship app API \n\n')
});

// list businesses
app.get('/students/:studentid?', (req, res)=>{
  let studentId = req.params.studentid;
  db.any(`SELECT * FROM students WHERE 1=1 ${studentId ? 'AND student_id = '+studentId : '' }`)
      .then(function(data) {
          // success;
          debug('students data is : ', data);
          res.json(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error)
      });
});

// Students POST
app.post('/students', (req, res)=>{
  var newStudent = req.body;
  debug("req.headers.accept is ", req.headers.accept)
  debug('newStudent object is', newStudent);
  db.one(`insert into students (first_name, last_name, email, phone) 
          values ($1, $2, $3, $4) RETURNING *`, 
          [
            newStudent.firstname, 
            newStudent.lastname, 
            newStudent.emailaddress, 
            newStudent.phonenumber
          ])
      .then(function(data) {
          // success;
          debug('New student entered is ', data);
          res.status(201).send(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error)
      });
});

//Employers POST
app.post('/employers', (req, res)=>{
  var newEmployer = req.body;
  console.log("req.headers.accept is ", req.headers.accept)
  console.log('newEmployer object is', newEmployer);
  db.one(`insert into employers (employer_name, email, city, state, industry_sic_code, business_description) 
          values ($1, $2, $3, $4, $5, $6) RETURNING *;`, 
          [
            newEmployer.employername,  
            newEmployer.emailaddress,
            newEmployer.city, 
            newEmployer.usstate,
            newEmployer.industry,
            newEmployer.description
          ])
      .then(function(data) {
          // success;
          debug('New employer entered is ', data);
          res.status(201).send(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error)
          
      });
});


//Recruiters POST
app.post('/recruiters', (req, res)=>{
  var newRecruiter = req.body;
  console.log("req.headers.accept is ", req.headers.accept)
  console.log('newReruiter object is', newRecruiter);
  db.one(`insert into recruiter (first_name, last_name, email, phone, title, recruiter_company_name) 
          values ($1, $2, $3, $4, $5, $6) RETURNING *;`, 
          [
            newRecruiter.first_name,  
            newRecruiter.last_name, 
            newRecruiter.email, 
            newRecruiter.phone,
            newRecruiter.title,
            newRecruiter.recruiter_company_name
          ])
      .then(function(data) {
          // success;
          debug('New recruiter entered is ', data);
          res.status(201).send(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error)
          
      });
});

//Jobs POST
app.post('/jobs', (req, res)=>{
  var newJob = req.body;
  console.log("req.headers.accept is ", req.headers.accept)
  console.log('newJob object is', newJob);
  db.one(`
  insert into jobs (job_title, company_name, city, state, job_summary, responsibilities, qualifications,
  benefits, type, annual_salary, hourly_salary, employer_id) 
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
          [
            newJob.job_title,
            newJob.company_name,
            newJob.city,
            newJob.state,
            newJob.job_summary,
            newJob.responsibilities,
            newJob.qualifications,
            newJob.benefits,
            newJob.type,
            newJob.annual_salary,
            newJob.hourly_salary,
            newJob.employer_id
          ]
        )
      .then(function(data) {
          // success;
          debug('New job entered is ', data);
          res.status(201).send(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error)
          
      });
});

app.get('/jobs', (req, res)=>{
  console.log('req.query is ', req.query)
  let employerId = req.query.employer_id;
  let jobId      = req.query.job_id;
  let sqlquery = `SELECT 
                    job_id, 
                    job_title,
                    e.employer_name,
                    company_name, 
                    e.city, 
                    e.state, 
                    job_summary, 
                    responsibilities, 
                    qualifications,
                    benefits, 
                    type, 
                    annual_salary, 
                    hourly_salary, 
                    j.employer_id, 
                    created_at::DATE 
                  FROM jobs j INNER JOIN employers e on (e.employer_id = j.employer_id)
                  WHERE 1=1
                  AND j.employer_id = ${employerId} 
                  ${jobId ? 'AND job_id = '+jobId : '' }`;
  debug('sqlqery is ', sqlquery);                
  if (!employerId) throw Error('No employer id provided');
  db.any(sqlquery)
      .then(function(data) {
          // success;
          debug('jobs data is : ', data);
          res.json(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error.message)
      });
});

app.get('/employers', (req, res)=>{
  let EmployerId = req.params.employerid;
  db.any(`SELECT * FROM employers WHERE 1=1 ${EmployerId ? 'AND employer_id = '+EmployerId : '' }`)
      .then(function(data) {
          // success;
          debug('employer data is : ', data);
          res.json(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error)
      });
});

app.get('/recruiters', (req, res)=>{
  let RecruiterId = req.params.recruiterid;
  db.any(`SELECT * FROM recruiter WHERE 1=1 ${RecruiterId ? 'AND recruiter_id = '+EmployerId : '' }`)
      .then(function(data) {
          // success;
          debug('recruiter data is : ', data);
          res.json(data);
      })
      .catch(function(error) {
          // error;
          console.log('Error :', error)
      });
});

//upload resume file POST
app.post('/uploadresume', (req, res, next) => {
  console.log(req);
  let uploadFile = req.files.file;

  uploadFile.mv(`${__dirname}/public/${req.body.filename}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}`});
  });

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

app.listen(port, () => {
  console.log(`API for internship app is running on port ${port}`);
});

// passport
// app.post('/passport', function(req, res, next) {
//   //email validation logic
// console.log('registering user');
// User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
//   if (err) {
//     console.log('error while user register!', err);
//       res.redirect('register');
//         return next(err);
//   }
//    passport.authenticate('local')
//    (req, res, function (){
//        console.log('user registered!');
//        res.rend('user registered');
//   });
// });
// });


module.exports = app;
// module.exports = router;