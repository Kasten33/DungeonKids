// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an instance of the Express application
const app = express();
// Define the port number for the server
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve page.html at the root URL ('/')
app.get('/', (req, res) => {
    // Send the 'page.html' file located in the 'public' directory
    res.sendFile(path.join(__dirname, 'public', 'page.html'));
});

// Handle POST requests to update the JSON file
app.post('/update-json', (req, res) => {
    // Get the updated data from the request body
    const updatedData = req.body;
    // Write the updated data to 'data.json' in the 'public' directory
    fs.writeFile(path.join(__dirname, 'public', 'data.json'), JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            // Log an error if writing to the JSON file fails
            console.error('Error writing JSON file:', err);
            // Respond with a 500 status and an error message
            res.status(500).json({ message: 'Error writing JSON file' });
        } else {
            // Respond with a success message if the file is updated successfully
            res.json({ message: 'JSON file updated successfully' });
        }
    });
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
