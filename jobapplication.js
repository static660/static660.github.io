const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '')));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'about.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'projects.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'contact.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
