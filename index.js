// Import express and supabase
const express = require('express');
const supabaseClient = require('@supabase/supabse-js');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabseURL = 'https://peeajhsltbxxsnpjznas.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZWFqaHNsdGJ4eHNucGp6bmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMTIzMzMsImV4cCI6MjA1MDU4ODMzM30.8LNUARKWJUFXqxDYAsoZVMoTzs6peX538L34eNi_P_Y';
const supabse = supabaseClient.createClient(supabseURL, supabaseKey);

app.get('/customers', async(req, res) => {
    console.log('Attempting to get all customers.');

    const {data, error} = await supabaseClient.from('customer').select();

    console.log('Data Retrieved:', data);
    

    if(error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Retrieved Data');
        res.send(data);
    }
});

app.post('/customer', async(req, res) => {
    console.log('Attempting to add Customer.');

    console.log('Request', req.body);

    const firstName = request.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const preferences = req.body.preferences;

    const {data, error} = await supabaseClient.from('customer').insert({
        'customer_firstName': firstName, 
        'customer_lastName': lastName, 
        'customer_email': email, 
        'customer_preference': preferences,
    }).select();

    if(error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Retrieved Data');
        res.send(data);
    }
});

app.listen(port, () => {
    console.log('App is Aliveee');
});