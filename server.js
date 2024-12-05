const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); 

const userRoutes = require('./routes/userRoutes');
const mainRoutes = require('./routes/mainRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const blogRoutes = require('./routes/blogRoutes');
const companyRoutes = require("./routes/companyRoutes");
const visaRoutes = require("./routes/visaRoutes");
// Create an Express app
const app = express();

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:8000/', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// Set up paths
const viewsPath = path.join(__dirname, 'views');

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(methodOverride('_method'));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// Serve static files from the 'public' directory
app.use(express.static(viewsPath));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Define routes
app.use('/', mainRoutes);
app.use('/pages', cmsRoutes);
app.use('/blogs', blogRoutes);
app.use('/users', blogRoutes);
app.use("/companies", companyRoutes);
app.use("/visa", visaRoutes);

app.use('/api/users', userRoutes);
app.use('/api/pages', cmsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', blogRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/visa", visaRoutes);
// Error handling route (e.g., for 404 Not Found)
app.use((req, res, next) => {
  res.status(404).render('404'); 
});
const PORT = process.env.PORT;

const mongoURI = "mongodb://127.0.0.1:27017/cms-live";
//const mongoURI = "mongodb+srv://azeemmunirbutt:W6sr8ZEkQqroXqlK@cluster0.ko3sy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.listen(PORT || 8000, () => {
  console.log('server started');
});