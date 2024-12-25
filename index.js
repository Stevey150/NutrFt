// Import express and supabase
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3001;

// Supabase client setup

// Our api url followed by api key 
const supabase = createClient(
  'https://peeajhsltbxxsnpjznas.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZWFqaHNsdGJ4eHNucGp6bmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMTIzMzMsImV4cCI6MjA1MDU4ODMzM30.8LNUARKWJUFXqxDYAsoZVMoTzs6peX538L34eNi_P_Y'
  
);

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Newsletter signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'newsletterSignup.html'));
});

// Newsletter success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'newsletterSuccess.html'));
});

// Exercise page
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

// Serve the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Endpoint to create a newsletter entry
app.post('/customer', async (req, res) => {
  const { firstName, lastName, email, interests } = req.body;

  // Insert data into the table
  const { data, error } = await supabase
    .from('customer') 
    .insert([
      {
        customer_firstName: firstName,
        customer_lastName: lastName,
        customer_email: email,
        customer_preference: interests.join(', '), 
      }
    ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // Redirect to the success page after successful form submission
  res.redirect('/success');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});