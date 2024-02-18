import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log(`Background services up and running on port ${port}`)
});



