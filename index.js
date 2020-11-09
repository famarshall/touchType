const express = require('express');
const app = express();
app.listen(3000,() => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit:'1mb' }));

app.post('/api',(request,response) => {
    console.log('I got a request!');
    console.log(request.body);
    const json= request.body;
    response.json({
        status:'success',
        name: json.name,
        age: json.age

    });
});

// how to auto run node if this code changes:
// https://youtu.be/Kw5tC5nQMRY?t=434