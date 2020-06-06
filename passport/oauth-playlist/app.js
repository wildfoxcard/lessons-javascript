const express = require('express');

const authRoutes = require('./routes/auth-routes');

const app = express();

app.set("view engine", "ejs");

//create home route
app.get('/', (req, res) => {
    res.render("home");
});

//set up routes
app.use('/auth', authRoutes)

app.listen(3000, () => {
    console.log('app now listen for request on port 3000')
});