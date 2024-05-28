const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/Icons', express.static(path.join(__dirname, '../Project_Images/Icons')));
app.use('/Images', express.static(path.join(__dirname, '../Project_Images/Images')));


// Use user routes
app.use('/', userRoutes);

// Use admin routes
app.use('/admin', adminRoutes);


app.use('/Home', express.static(path.join(__dirname, '../Home/')));
app.use('/AboutUs', express.static(path.join(__dirname, '../AboutUs')));
app.use('/Services', express.static(path.join(__dirname, '../Services')));
app.use('/UserDashboard', express.static(path.join(__dirname, '../UserDashboard')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'Home', 'homepage.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
