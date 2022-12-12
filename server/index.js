const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT ||  5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Working!' });
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Database connected');
    } catch(e) {
        console.log(e);
    }
}

start()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
