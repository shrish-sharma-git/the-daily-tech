const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

// Importing Routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');

// app
const app = express();

// database
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log('Database Connected Successfully');
    });

// middlewares
// app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: '50mb'}));

// app.use(bodyParser.json())

app.use(morgan('dev'));
app.use(cookieParser());

// cors
if(process.env.NODE_ENV == 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', blogRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);

// port
const port = process.env.PORT || 8000;

// Listening App
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
})


