import express, { urlencoded } from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';

const app = express();

const PORT = 2716;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

DBConnection();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))