var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts')
const path = require('path');
const fileUpload = require('express-fileupload');


const {home,about,support} = require('./routes/index');
const {vehicle,print} = require('./routes/vehicle');
const {getinventoryPage} = require('./routes/inventory');
const {addVehiclePage, addVehicle, deleteVehicle, editVehicle, editVehiclePage} = require('./routes/items');
const {today} = require('./routes/maintenance');
const {history,jobEditPage,jobEdit,deletejob} = require('./routes/history');
const {jobContent} = require('./routes/jobContents');
const{jobAddPage, jobAdd} = require('./routes/job.js')
const{staff} = require('./routes/staffmain.js')
const {addstaff,addstaffPage,viewStaff,update,deleteStaff} = require('./routes/staff');

var app = express();

const port = 3000;


var bodyParser =require('body-parser') 




// view engine setup
app.set('port', process.env.port || port); // set express to use this port

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')
app.set('partials', path.join(__dirname, 'partials'));


app.use(expressLayouts);
app.use(logger('dev'));
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload


app.get('/', home);
app.get('/home', home);
app.get('/about', about);
app.get('/support', support);

app.get('/staff', staff);
app.get('/staff/view-staff/:id', viewStaff);
app.get('/staff/add-staff', addstaffPage);
app.get('/staff/delete/:id', deleteStaff);
app.post('/staff/add-staff', addstaff);
app.post('/staff/view-staff/:id', update);



app.get('/maintenance', today);
app.get('/maintenance/history', history);
app.get('/maintenance/add-work', jobAddPage);
app.get('/maintenance/edit-work/:id', jobEditPage);
app.get('/maintenance/view-work', jobContent);
app.get('/maintenance/delete/:id', deletejob);
app.post('/maintenance/add-work', jobAdd);
app.post('/maintenance/edit-work/:id', jobEdit);

app.get('/vehicle', vehicle);
app.get('/print/:id', print);
app.get('/inventory', getinventoryPage); 
app.get('/inventory/add', addVehiclePage);
app.get('/inventory/edit/:id', editVehiclePage);
app.get('/inventory/delete/:id', deleteVehicle);
app.post('/inventory/add', addVehicle);
app.post('/inventory/edit/:id', editVehicle);


////sql
const mysql = require('mysql');

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;




module.exports= app;