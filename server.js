const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'website'))); // Serve static files from 'website' folder

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html')); // Serve the index.html file
});

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = req.body;
    res.send(projectData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
