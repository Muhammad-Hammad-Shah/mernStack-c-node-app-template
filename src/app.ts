import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the auth page');
});

export default app;
