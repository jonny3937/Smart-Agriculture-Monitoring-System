const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require('./routes');

app.use(cors({
    origin: 'http://localhost:5173', // Adjust based on your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
