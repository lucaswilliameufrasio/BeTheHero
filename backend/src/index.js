const express = require('express');

const app = express();

app.use(express.json());

app.post('/users', (request, response) => {
    const body = request.body;

    return response.json({
        message: 'Hello World',
        data: body
    });
});

app.listen(7777);