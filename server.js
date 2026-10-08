const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database array (Mock Data)
let students = [
    { id: 1, name: 'Alice Smith', course: 'Computer Science', grade: '92' },
    { id: 2, name: 'Bob Jones', course: 'Information Technology', grade: '85' }
];

// READ: Display all students (Home Page)
app.get('/', (req, res) => {
    res.render('index', { students });
});

// CREATE: Add a new student record
app.post('/add', (req, res) => {
    const newStudent = {
        id: Date.now(), // Unique ID using timestamp
        name: req.body.name,
        course: req.body.course,
        grade: req.body.grade
    };
    students.push(newStudent);
    res.redirect('/');
});

// UPDATE (Form): Load the edit page for a specific student
app.get('/edit/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    res.render('edit', { student });
});

// UPDATE (Action): Save the updated student details
app.post('/update/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.name = req.body.name;
        student.course = req.body.course;
        student.grade = req.body.grade;
    }
    res.redirect('/');
});

// DELETE: Remove a student record
app.get('/delete/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    students = students.filter(s => s.id !== studentId);
    res.redirect('/');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});