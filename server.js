require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});